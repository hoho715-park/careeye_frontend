import React, { useState } from "react";
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
      const userId = localStorage.getItem("userId"); // 로그인한 사용자 정보 사용

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
        <form className="register-form" onSubmit={handleSubmit}>
          {/* 시니어 ID */}
          <label className="input-label" htmlFor="seniorId">
            시니어 ID
          </label>
          <input
            id="seniorId"
            type="text"
            name="seniorId"
            value={formData.seniorId}
            onChange={handleChange}
            required
          />

          {/* 요양시설 ID */}
          <label className="input-label" htmlFor="facilityId">
            요양시설 ID
          </label>
          <input
            id="facilityId"
            type="text"
            name="facilityId"
            value={formData.facilityId}
            onChange={handleChange}
            required
          />

          {/* 호실 */}
          <label className="input-label" htmlFor="room">
            호실
          </label>
          <input
            id="room"
            type="text"
            name="room"
            value={formData.room}
            onChange={handleChange}
          />

          {/* 이름 */}
          <label className="input-label" htmlFor="name">
            이름
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* 생년월일 */}
          <label className="input-label" htmlFor="birthDate">
            생년월일 (YYYY-MM-DD)
          </label>
          <input
            id="birthDate"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />

          {/* 성별 */}
          <label className="input-label">성별</label>
          <div className="gender-select">
            <button
              type="button"
              className={`gender-btn male ${
                formData.gender === "남" ? "active" : ""
              }`}
              onClick={() => handleGenderSelect("남")}
            >
              남
            </button>

            <button
              type="button"
              className={`gender-btn female ${
                formData.gender === "여" ? "active" : ""
              }`}
              onClick={() => handleGenderSelect("여")}
            >
              여
            </button>
          </div>

          {/* 특이사항 */}
          <label className="input-label" htmlFor="notes">
            특이사항
          </label>
          <input
            id="notes"
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            등록하기
          </button>
        </form>
      ) : (
        // ===== 제출 완료 화면 =====
        <div className="result-wrapper">
          <div
            className={`senior-card ${
              formData.gender === "여" ? "female-border" : "male-border"
            }`}
          >
            <h3>{formData.name}</h3>

            <p>
              <strong>시니어 ID:</strong> {formData.seniorId}
            </p>
            <p>
              <strong>요양시설 ID:</strong> {formData.facilityId}
            </p>
            <p>
              <strong>호실:</strong> {formData.room}
            </p>
            <p>
              <strong>생년월일:</strong> {formData.birthDate}
            </p>
            <p>
              <strong>성별:</strong> {formData.gender}
            </p>
            <p>
              <strong>특이사항:</strong> {formData.notes}
            </p>
          </div>

          <div className="button-group">
            <button className="back-btn" onClick={() => navigate("/my-senior")}>
              홈으로 돌아가기
            </button>

            <button className="reset-btn" onClick={handleReset}>
              추가 등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeniorRegister;
