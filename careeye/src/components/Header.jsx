import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="menubar-container">
      {/* 왼쪽 로고 */}
      <div className="menubar-left">
        <Link to="/" className="menubar-logo">
          <img src="/careeye_logo_v.png" alt="CareEye logo" />
        </Link>
      </div>

      {/* 중앙 메뉴 */}
      <nav className={`menubar-center ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/my-senior" onClick={() => setMenuOpen(false)}>
              My Senior
            </Link>
          </li>
          <li>
            <Link to="/monitoring" onClick={() => setMenuOpen(false)}>
              Monitoring
            </Link>
          </li>
          <li>
            <Link to="/notice" onClick={() => setMenuOpen(false)}>
              Notice
            </Link>
          </li>
          <li>
            <Link to="/faq" onClick={() => setMenuOpen(false)}>
              FAQ
            </Link>
          </li>
          <li className="mobile-login">
            <Link
              to="/login"
              className="login-button"
              onClick={() => setMenuOpen(false)}
            >
              LOGIN
            </Link>
          </li>
        </ul>
      </nav>

      {/* 오른쪽 로그인 버튼 */}
      <div className="menubar-right">
        <Link to="/login" className="login-button">
          LOGIN
        </Link>

        {/* 햄버거 버튼 */}
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </div>
      </div>
    </header>
  );
};

export default Header;
