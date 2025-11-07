import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FAQ from "./pages/FAQ";
import Header from "./components/Header";

/* 🧓 MySenior 관련 페이지 추가 */
import MySenior from "./pages/MySenior";
import SeniorRegister from "./pages/SeniorRegister";
import SeniorInfo from "./pages/SeniorInfo";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/faq" element={<FAQ />} />
        {/* ✅ MySenior 관련 라우트 */}
        <Route path="/my-senior" element={<MySenior />} />
        <Route path="/my-senior/register" element={<SeniorRegister />} />
        <Route path="/my-senior/info" element={<SeniorInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
