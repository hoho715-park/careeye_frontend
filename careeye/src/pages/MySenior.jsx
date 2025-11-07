import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MySenior.css";

const MySenior = () => {
  const navigate = useNavigate();

  return (
    <div className="mysenior-container">
      <h2 className="mysenior-title">My Senior</h2>

      <div className="mysenior-card-wrapper">
        {/* 시니어 등록하기 */}
        <div className="mysenior-card" onClick={() => navigate("/my-senior/register")}>
          <img src="/mysenior/senior.png" alt="시니어 등록" className="mysenior-img" />
          <p>시니어 등록하기</p>
        </div>

        {/* 시니어 정보 조회 */}
        <div className="mysenior-card" onClick={() => navigate("/my-senior/info")}>
          <img src="/mysenior/scope.png" alt="시니어 정보 조회" className="mysenior-img" />
          <p>시니어 정보 조회</p>
        </div>
      </div>
    </div>
  );
};

export default MySenior;
