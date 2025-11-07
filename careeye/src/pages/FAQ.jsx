import React, { useState } from "react";
import "../styles/FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const faqData = [
    {
      question: "넘어짐은 어떻게 알려주나요?",
      answer:
        "Care EYE는 AI 영상 분석 기술을 통해 낙상 상황을 자동으로 인식합니다. 낙상이 감지되면 즉시 관리자 또는 보호자에게 알림이 전송되어 신속하게 대응할 수 있습니다.",
    },
    {
      question: "개인정보는 안전하게 보호되나요?",
      answer:
        "네, Care EYE는 얼굴 인식 없이 행동 패턴만 분석하며, 영상 데이터는 실시간 처리 후 즉시 암호화되어 저장되지 않습니다. 개인정보 보호법을 철저히 준수합니다.",
    },
    {
      question: "설치는 어렵지 않나요?",
      answer:
        "전문 엔지니어의 복잡한 설치가 필요하지 않습니다. 카메라를 지정 위치에 설치하고 네트워크를 연결하면 자동으로 시스템이 작동합니다.",
    },
    {
      question: "실시간 모니터링은 어디서 확인하나요?",
      answer:
        "Care EYE 관리자 페이지 또는 전용 앱에서 모든 감지 상태를 실시간으로 확인할 수 있습니다. 낙상 알림과 함께 영상 스냅샷이 즉시 표시됩니다.",
    },
    {
      question: "시스템 점검이나 업데이트는 어떻게 하나요?",
      answer:
        "시스템은 클라우드를 통해 자동으로 업데이트됩니다. 관리자 페이지에서 버전 정보와 점검 일정을 간단히 확인할 수 있습니다.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">FAQ</h2>

      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>
              <span className={`arrow ${activeIndex === index ? "open" : ""}`}>
                ▼
              </span>
            </button>
            <div
              className={`faq-answer ${activeIndex === index ? "show" : ""}`}
            >
              <p>{item.answer}</p>
            </div>

            {/* ✅ 마지막 항목에만 버튼 + 선 위쪽 배치 */}
            {index === faqData.length - 1 && (
              <>
                <div className="faq-divider"></div>
                <div className="contact-btn-wrapper">
                  <button className="contact-button" onClick={togglePopup}>
                    추가 문의하기
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ✅ 문의 팝업 */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>문의하기</h3>
            <textarea
              className="popup-textarea"
              placeholder="문의 내용을 입력하세요..."
            ></textarea>
            <div className="popup-buttons">
              <button className="popup-submit">보내기</button>
              <button className="popup-close" onClick={togglePopup}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;
