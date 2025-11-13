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
  const [userId, setUserId] = useState(""); // → 백엔드로는 id 로 전달됨
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(""); // → 백엔드로는 birth 로 전달됨
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // ⭐ 회원가입 요청
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // ⭐ 백엔드 DTO(UserRegisterDto)에 맞춰 데이터 필드명 수정됨
    const signUpData = {
      id: userId,
      username: username,
      password: password,
      email: email,
      birth: birthday,
      phoneNumber: phoneNumber,
      gender: gender,
    };

    try {
      console.log("회원가입 요청 데이터:", signUpData);

      // ⭐ 백엔드 API URL도 실제 사용 중인 URL로 변경
      const response = await axios.post(
        "http://localhost:8080/user/register",
        signUpData
      );

      console.log("서버 응답:", response.data);
      setShowPopup(true);

    } catch (error) {
      console.error("회원가입 중 에러:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Network Error";

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
          
          {/* 사용자 ID */}
          <div className="input-group">
            <FaRegIdBadge className="input-icon" />
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          {/* 이름 */}
          <div className="input-group">
            <FaRegUser className="input-icon" />
            <input
              type="text"
              placeholder="이름"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* 이메일 */}
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 전화번호 */}
          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              placeholder="전화번호 (예: 010-1234-5678)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {/* 생년월일 */}
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

          {/* 성별 */}
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
