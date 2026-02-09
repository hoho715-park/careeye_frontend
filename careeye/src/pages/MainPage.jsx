import React, { useState } from "react";
import "../styles/MainPage.css";
import Header from "../components/Header";
import CameraModal from "../components/CameraModal";

const MainPage = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  return (
    <>
      <Header />
      <section className="main-hero">
        <div className="main-text">
          <h1>
            Care EYE,<br />
            노약자의 안전을 지키다
          </h1>
          <p>
            AI 기반 낙상 감지로 요양시설의 안전을 실시간으로 모니터링합니다.
          </p>
          <button className="main-btn" onClick={handleOpenCamera}>
            실시간 모니터링 하기 →
          </button>
        </div>
      </section>
      
      {isCameraOpen && <CameraModal onClose={handleCloseCamera} />}
    </>
  );
};

export default MainPage;