import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
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
        </ul>
      </nav>

      {/* 오른쪽 로그인 버튼 */}
      <div className="menubar-right">
        <Link to="/login" className="login-button">
          LOGIN
        </Link>
      </div>
    </header>
  );
};

export default Header;
