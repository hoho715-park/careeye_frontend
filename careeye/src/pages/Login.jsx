import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaRegUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 🔥 로그인 페이지 들어오면 자동으로 로그아웃 처리
  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        id: userId,
        password,
      });

      alert("로그인 성공!");

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId", response.data.userId);

      navigate("/");
    } catch (error) {
      alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <img src="/careeye_logo_v.png" alt="CareEye Logo" className="login-logo" />

        <div className="input-group">
          <FaRegUser className="input-icon" />
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>

        <div className="link-group">
          <Link to="/find-id">아이디 찾기</Link>
          <span>|</span>
          <Link to="/find-password">비밀번호 찾기</Link>
        </div>

        <div className="register-group">
          <span>아직 회원이 아니신가요?</span>
          <Link to="/signup" className="register-link">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
