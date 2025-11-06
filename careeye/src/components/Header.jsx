import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="menubar-container">
      {/* 왼쪽 로고 */}
      <div className="menubar-left">
        <Link to="/" className="menubar-logo">
          <img src="/careeye_logo_v.png" alt="CareEye logo" />
        </Link>
      </div>

      {/* 중앙 메뉴 */}
      <nav className="menubar-center">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/monitoring">Monitoring</Link></li>
          <li><Link to="/system">System</Link></li>
          <li><Link to="/more">More</Link></li>
        </ul>
      </nav>

      {/* 오른쪽 로그인 버튼 */}
      <div className="menubar-right">
        <Link to="/login" className="header-login-button">
          LOGIN
        </Link>
        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="mobile-menu">
          <FaTimes className="close-btn" onClick={() => setMenuOpen(false)} />
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/monitoring" onClick={() => setMenuOpen(false)}>Monitoring</Link>
          <Link to="/system" onClick={() => setMenuOpen(false)}>System</Link>
          <Link to="/more" onClick={() => setMenuOpen(false)}>More</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>LOGIN</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
