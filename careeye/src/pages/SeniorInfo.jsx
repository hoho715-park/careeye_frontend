import React, { useState } from "react";
import "../styles/SeniorInfo.css";

const SeniorInfo = () => {
  // ✅ 더미 데이터
  const dummyData = [
    {
      name: "김땡개",
      seniorId: "SNR001",
      facilityId: "FAC001",
      room: "203호",
      birthDate: "1920-07-15",
      gender: "남",
      notes: "치매 초기 단계. 주기 모니터링 필요",
    },
    {
      name: "박성호",
      seniorId: "SNR002",
      facilityId: "FAC002",
      room: "401호",
      birthDate: "1950-03-22",
      gender: "여",
      notes: "심장 질환 이력 있음",
    },
    {
      name: "박성호",
      seniorId: "SNR005",
      facilityId: "FAC003",
      room: "305호",
      birthDate: "1945-11-08",
      gender: "남",
      notes: "거동 불편, 휠체어 사용 중",
    },
  ];

  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const results = dummyData.filter(
      (senior) => senior.name.replace(/\s+/g, "") === searchName.replace(/\s+/g, "")
    );
    setSearchResults(results.length > 0 ? results : "not-found");
  };

  return (
    <div className="senior-info-container">
      <div className="senior-info-content">
        <h2 className="senior-info-title">시니어 정보 조회</h2>

        {/* 검색 입력 */}
        <form className="search-form info-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="시니어 이름을 입력하세요"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            required
          />
          <button type="submit" className="search-btn">
            검색
          </button>
        </form>

        {/* 검색 결과 */}
        <div className="result-section">
          {searchResults === null ? (
            <p className="info-placeholder">이름을 입력하고 검색하세요 🔍</p>
          ) : searchResults === "not-found" ? (
            <p className="not-found-text">❌ 해당 이름의 시니어를 찾을 수 없습니다.</p>
          ) : (
            <div className="result-list horizontal-layout">
              {searchResults.map((senior, index) => (
                <div
                  key={index}
                  className={`senior-card ${
                    senior.gender === "여" ? "female-border" : "male-border"
                  }`}
                >
                  <h3>{senior.name}</h3>
                  <p><strong>시니어 ID:</strong> {senior.seniorId}</p>
                  <p><strong>요양시설 ID:</strong> {senior.facilityId}</p>
                  <p><strong>호실:</strong> {senior.room}</p>
                  <p><strong>생년월일:</strong> {senior.birthDate}</p>
                  <p><strong>성별:</strong> {senior.gender}</p>
                  <p><strong>특이사항:</strong> {senior.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeniorInfo;
