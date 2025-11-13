import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation(); // 🔥 페이지 이동할 때마다 변경됨 → Header 재렌더링됨

  useEffect(() => {
    const loginState = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginState); // 🔥 항상 최신 상태로 업데이트
  }, [location]); // 🔥 페이지 이동할 때마다 로그인 상태 체크

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="menubar-container">
      <div className="menubar-left">
        <Link to="/" className="menubar-logo" onClick={closeMenu}>
          <img src="/careeye_logo_v.png" alt="CareEye logo" />
        </Link>
      </div>

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

          {/* 🔥 모바일 메뉴에서도 로그인/프로필 처리 */}
          <li className="mobile-login">
            {isLoggedIn ? (
              <Link to="/mypage" onClick={closeMenu}>
                <FaUserCircle size={30} />
              </Link>
            ) : (
              <Link to="/login" className="login-button" onClick={closeMenu}>
                LOGIN
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <div className="menubar-right">
        {/* 🔥 데스크탑 로그인/프로필 처리 */}
        {isLoggedIn ? (
          <Link to="/mypage">
            <FaUserCircle size={36} color="#3a7afe" />
          </Link>
        ) : (
          <Link to="/login" className="login-button desktop-login">
            LOGIN
          </Link>
        )}

        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </div>
    </header>
  );
};

export default Header;
