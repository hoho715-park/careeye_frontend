import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaRegUser,
  FaLock,
  FaRegIdBadge,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaVenusMars,
} from "react-icons/fa";
import "../styles/SignUp.css";

const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      console.log("회원가입 요청 데이터:", { userId, username, password, email, birthday, phoneNumber, gender });
      const response = await axios.post("http://localhost:8080/api/users/register", {
        userId,
        username,
        password,
        email,
        birthday,
        phoneNumber,
        gender,
      });
      console.log("서버 응답:", response);
      setShowPopup(true);
    } catch (error) {
      console.error("회원가입 중 에러:", error);

      // 백엔드가 아직 준비되지 않은 경우(local 개발), 네트워크 에러이면 로컬에 임시 저장하고 성공 처리
      const isNetworkError = !error.response || error.message?.toLowerCase().includes("network error");
      if (isNetworkError) {
        console.warn("백엔드 미구현 또는 응답 없음 - 로컬에 사용자 정보 저장(개발용)");
        try {
          const mockUsers = JSON.parse(localStorage.getItem("mock_users") || "[]");
          mockUsers.push({ userId, username, password, email, birthday, phoneNumber, gender, createdAt: new Date().toISOString() });
          localStorage.setItem("mock_users", JSON.stringify(mockUsers));
          setShowPopup(true);
          return;
        } catch (e) {
          console.error("로컬 저장 실패:", e);
        }
      }

      const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Network Error";
      alert("회원가입 실패: " + errorMessage);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-box">
        <img
          src="/careeye_logo_v.png"
          alt="CareEye Logo"
          className="signup-logo"
        />

        <div className="form-section">
          <div className="input-group">
            <FaRegIdBadge className="input-icon" />
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaRegUser className="input-icon" />
            <input
              type="text"
              placeholder="이름"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 전화번호 입력 추가 */}
          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              placeholder="전화번호 (예: 010-1234-5678)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {/* ✅ 생년월일 (라벨 추가하여 명확히 표시) */}
          <div className="input-group date-group">
            <label className="date-title">생년월일</label>
            <FaCalendar className="input-icon" />
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="date-input"
            />
          </div>

          {/* 성별 선택 */}
          <div className="gender-group">
            <FaVenusMars className="input-icon gender-icon" />
            <div className="gender-buttons">
              <button
                className={`gender-button ${gender === "male" ? "selected male" : ""}`}
                onClick={() => setGender("male")}
              >
                남자
              </button>
              <button
                className={`gender-button ${gender === "female" ? "selected female" : ""}`}
                onClick={() => setGender("female")}
              >
                여자
              </button>
            </div>
          </div>
        </div>

        <button className="signup-button" onClick={handleSignUp}>
          가입하기
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>회원가입 성공 🎉</h2>
            <p>이제 로그인하실 수 있습니다.</p>
            <button className="popup-button" onClick={() => navigate("/login")}>
              로그인하러 가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
