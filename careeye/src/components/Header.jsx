import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <ul>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/my-senior" onClick={closeMenu}>
              My Senior
            </Link>
          </li>
          <li>
            <Link to="/monitoring" onClick={closeMenu}>
              Monitoring
            </Link>
          </li>
          <li>
            <Link to="/notice" onClick={closeMenu}>
              Notice
            </Link>
          </li>
          <li>
            <Link to="/faq" onClick={closeMenu}>
              FAQ
            </Link>
          </li>
          <li className="mobile-login">
            <Link to="/login" className="login-button" onClick={closeMenu}>
              LOGIN
            </Link>
          </li>
        </ul>
      </nav>

      {/* 오른쪽 영역 */}
      <div className="menubar-right">
        {/* 데스크탑용 로그인 */}
        <Link to="/login" className="login-button desktop-login">
          LOGIN
        </Link>

        {/* 햄버거 버튼 */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          {menuOpen ? "✕" : "☰"}
        </div>
      </div>
    </header>
  );
};

export default Header;
