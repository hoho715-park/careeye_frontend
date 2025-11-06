import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <nav className="menubar-container">
      {/* 로고 */}
      <div className="menubar-logo">
        <Link to="/">
          <img src="/logo.png" alt="CareEye logo" />
        </Link>
      </div>

      {/* 메뉴 */}
      <ul className="menubar-nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/monitoring">Monitoring</Link></li>
        <li><Link to="/system">System</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
