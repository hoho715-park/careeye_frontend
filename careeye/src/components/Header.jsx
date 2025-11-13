import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";   // 🔥 프로필 아이콘 추가
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="menubar-container">
      {/* 왼쪽 로고 */}
      <div className="menubar-left">
        <Link to="/" className="menubar-logo" onClick={closeMenu}>
          <img src="/careeye_logo_v.png" alt="CareEye logo" />
        </Link>
      </div>

      {/* 중앙 메뉴 */}
      <nav className={`menubar-center ${menuOpen ? "open" : ""}`}>
        {menuOpen && (
          <div className="close-button" onClick={closeMenu}>
            ✕
          </div>
        )}
        <ul>
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/my-senior" onClick={closeMenu}>My Senior</Link>
          </li>
          <li>
            <Link to="/monitoring" onClick={closeMenu}>Monitoring</Link>
          </li>
          <li>
            <Link to="/notice" onClick={closeMenu}>Notice</Link>
          </li>
          <li>
            <Link to="/faq" onClick={closeMenu}>FAQ</Link>
          </li>

          {/* 모바일 LOGIN/프로필 */}
          <li className="mobile-login">
            {!isLoggedIn ? (
              <Link to="/login" className="login-button" onClick={closeMenu}>
                LOGIN
              </Link>
            ) : (
              <Link to="/my-senior" className="profile-icon" onClick={closeMenu}>
                <FaUserCircle className="profile-react-icon" />
              </Link>
            )}
          </li>
        </ul>
      </nav>

      {/* 오른쪽 영역 */}
      <div className="menubar-right">
        {/* 데스크탑: 로그인 상태 표시 */}
        {!isLoggedIn ? (
          <Link to="/login" className="login-button desktop-login">
            LOGIN
          </Link>
        ) : (
          <Link to="/my-senior" className="profile-icon desktop-profile">
            <FaUserCircle className="profile-react-icon" />
          </Link>
        )}

        {/* 햄버거 메뉴 */}
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </div>
    </header>
  );
};

export default Header;
