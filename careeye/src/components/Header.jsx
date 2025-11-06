import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="menubar-container">
      {/* 왼쪽 로고 */}
      <div className="menubar-left">
        <Link to="/" className="menubar-logo">
          <img src="/careeye_logo_v.png" alt="CareEye logo" />
        </Link>
      </div>

      {/* 중앙 메뉴 (데스크탑 전용) */}
      <nav className="menubar-center">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/monitoring">Monitoring</Link></li>
          <li><Link to="/system">System</Link></li>
          <li><Link to="/more">More</Link></li>
        </ul>
      </nav>

      {/* 오른쪽 로그인 버튼 (데스크탑 전용) */}
      <div className="menubar-right">
        <Link to="/login" className="login-button">
          LOGIN
        </Link>
      </div>

      {/* 햄버거 아이콘 (모바일 전용) */}
      <div className="hamburger-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </div>

      {/* 모바일 풀스크린 메뉴 */}
      <div className={`mobile-menu-full ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/monitoring" onClick={() => setIsMenuOpen(false)}>Monitoring</Link></li>
          <li><Link to="/system" onClick={() => setIsMenuOpen(false)}>System</Link></li>
          <li><Link to="/more" onClick={() => setIsMenuOpen(false)}>More</Link></li>
        </ul>
        <Link to="/login" className="mobile-login" onClick={() => setIsMenuOpen(false)}>
          LOGIN
        </Link>
      </div>
    </header>
  );
};

export default Header;
