import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SeniorRegister.css";

const SeniorRegister = () => {
  const [formData, setFormData] = useState({
    seniorId: "",
    facilityId: "",
    room: "",
    name: "",
    birthDate: "",
    gender: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // 화면 크기에 따라 스크롤 설정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
    };

    // 초기 실행
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 성별 선택
  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  // 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");

      await axios.post("http://localhost:8080/senior/register", {
        seniorId: formData.seniorId,
        hospitalId: formData.facilityId,
        room: formData.room,
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender,
        notes: formData.notes,
        userId: userId,
      });

      setSubmitted(true);
    } catch (error) {
      alert("등록 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  // 추가 등록하기 버튼
  const handleReset = () => {
    setFormData({
      seniorId: "",
      facilityId: "",
      room: "",
      name: "",
      birthDate: "",
      gender: "",
      notes: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="register-container">
      {!submitted ? (
        <div className="register-card">
          {/* 카드 헤더 */}
          <div className="card-header">
            <div className="header-icon">👴🏻</div>
            <h2>시니어 등록</h2>
            <p>새로운 시니어 정보를 등록해주세요</p>
          </div>

          {/* 폼 영역 */}
          <form className="register-form" onSubmit={handleSubmit}>
            {/* 2열 레이아웃 */}
            <div className="form-row">
              <div className="form-group">
                <label className="input-label" htmlFor="seniorId">
                  <span className="label-icon">🆔</span>
                  시니어 ID
                </label>
                <input
                  id="seniorId"
                  type="text"
                  name="seniorId"
                  placeholder="ID를 입력하세요"
                  value={formData.seniorId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="input-label" htmlFor="facilityId">
                  <span className="label-icon">🏥</span>
                  요양시설 ID
                </label>
                <input
                  id="facilityId"
                  type="text"
                  name="facilityId"
                  placeholder="시설 ID를 입력하세요"
                  value={formData.facilityId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="input-label" htmlFor="name">
                  <span className="label-icon">✏️</span>
                  이름
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="input-label" htmlFor="room">
                  <span className="label-icon">🚪</span>
                  호실
                </label>
                <input
                  id="room"
                  type="text"
                  name="room"
                  placeholder="호실을 입력하세요"
                  value={formData.room}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="input-label" htmlFor="birthDate">
                  <span className="label-icon">🎂</span>
                  생년월일
                </label>
                <input
                  id="birthDate"
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="input-label">
                  <span className="label-icon">👤</span>
                  성별
                </label>
                <div className="gender-select">
                  <button
                    type="button"
                    className={`gender-btn male ${
                      formData.gender === "남" ? "active" : ""
                    }`}
                    onClick={() => handleGenderSelect("남")}
                  >
                    <span>👨</span> 남성
                  </button>

                  <button
                    type="button"
                    className={`gender-btn female ${
                      formData.gender === "여" ? "active" : ""
                    }`}
                    onClick={() => handleGenderSelect("여")}
                  >
                    <span>👩</span> 여성
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group full-width">
              <label className="input-label" htmlFor="notes">
                <span className="label-icon">📝</span>
                특이사항
              </label>
              <input
                id="notes"
                type="text"
                name="notes"
                placeholder="특이사항이 있다면 입력하세요"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn">
              <span>등록하기</span>
              <span className="btn-icon">→</span>
            </button>
          </form>
        </div>
      ) : (
        // ===== 제출 완료 화면 =====
        <div className="result-wrapper">
          <div className="success-icon">✅</div>
          <h2 className="success-title">등록 완료!</h2>
          
          <div
            className={`senior-card ${
              formData.gender === "여" ? "female-border" : "male-border"
            }`}
          >
            <div className="card-profile">
              <div className="profile-avatar">
                {formData.gender === "여" ? "👵🏻" : "👴🏻"}
              </div>
              <h3>{formData.name}</h3>
            </div>

            <div className="card-info-grid">
              <div className="info-item">
                <span className="info-label">🆔 시니어 ID</span>
                <span className="info-value">{formData.seniorId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">🏥 요양시설 ID</span>
                <span className="info-value">{formData.facilityId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">🚪 호실</span>
                <span className="info-value">{formData.room || "-"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">🎂 생년월일</span>
                <span className="info-value">{formData.birthDate}</span>
              </div>
              <div className="info-item">
                <span className="info-label">👤 성별</span>
                <span className="info-value">{formData.gender}</span>
              </div>
              <div className="info-item">
                <span className="info-label">📝 특이사항</span>
                <span className="info-value">{formData.notes || "-"}</span>
              </div>
            </div>
          </div>

          <div className="button-group">
            <button className="back-btn" onClick={() => navigate("/my-senior")}>
              ← 홈으로 돌아가기
            </button>

            <button className="reset-btn" onClick={handleReset}>
              + 추가 등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeniorRegister;