import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "회원";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <div className="mypage-container">
      <h1>{username}님 환영합니다! 🎉</h1>
      
      <button className="logout-btn" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
