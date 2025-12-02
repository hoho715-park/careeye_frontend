import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FAQ from "./pages/FAQ";
import Header from "./components/Header";

/* 🧓 MySenior 관련 페이지 */
import MySenior from "./pages/MySenior";
import SeniorRegister from "./pages/SeniorRegister";
import SeniorInfo from "./pages/SeniorInfo";

/* ⭐ MyPage */
import MyPage from "./pages/MyPage";

/* 📋 Notice 추가 */
import Notice from "./pages/Notice";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/faq" element={<FAQ />} />

        {/* MySenior */}
        <Route path="/my-senior" element={<MySenior />} />
        <Route path="/my-senior/register" element={<SeniorRegister />} />
        <Route path="/my-senior/info" element={<SeniorInfo />} />

        {/* MyPage */}
        <Route path="/mypage" element={<MyPage />} />

        {/* 📋 Notice 추가 */}
        <Route path="/notice" element={<Notice />} />
      </Routes>
    </Router>
  );
}

export default App;