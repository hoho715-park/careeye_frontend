import React, { useEffect, useRef, useState } from "react";
import "../styles/CameraModal.css";

const CameraModal = ({ onClose }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 카메라 스트림 시작
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
        
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("카메라 접근 오류:", err);
        setError("카메라에 접근할 수 없습니다. 카메라 권한을 확인해주세요.");
      }
    };

    startCamera();

    // 컴포넌트 언마운트 시 카메라 스트림 정리
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  return (
    <div className="camera-modal-overlay" onClick={handleClose}>
      <div className="camera-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="camera-modal-header">
          <h2>실시간 모니터링</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        
        <div className="camera-container">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="camera-video"
            />
          )}
        </div>
        
        <div className="camera-modal-footer">
          <div className="monitoring-status">
            <span className="status-indicator"></span>
            <span>모니터링 중</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;