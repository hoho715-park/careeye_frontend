import React, { useState, useEffect } from "react";
import "../styles/SeniorInfo.css";

const SeniorInfo = () => {
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [allSeniors, setAllSeniors] = useState([]);

  const userId = localStorage.getItem("userId");

  // 🔥 로그인한 사용자의 전체 시니어 목록 불러오기
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8080/senior/list/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setAllSeniors(data);
      })
      .catch((err) => console.error("시니어 조회 오류:", err));
  }, [userId]);

  // 🔍 검색 실행
  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = allSeniors.filter(
      (senior) =>
        senior.seniorName.replace(/\s+/g, "") ===
        searchName.replace(/\s+/g, "")
    );

    setSearchResults(filtered.length > 0 ? filtered : "not-found");
  };

  return (
    <div className="senior-info-container">
      <div className="senior-info-content">
        <h2 className="senior-info-title">시니어 정보 조회</h2>

        {/* 검색 폼 */}
        <form className="search-form info-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="시니어 이름을 입력하세요"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            required
          />
          <button type="submit" className="search-btn">검색</button>
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
                    senior.seniorGender === "여"
                      ? "female-border"
                      : "male-border"
                  }`}
                >
                  <h3>{senior.seniorName}</h3>
                  <p><strong>시니어 ID:</strong> {senior.seniorId}</p>
                  <p><strong>요양시설 ID:</strong> {senior.hospitalId}</p>
                  <p><strong>호실:</strong> {senior.roomNumber}</p>
                  <p><strong>생년월일:</strong> {senior.seniorBirth}</p>
                  <p><strong>성별:</strong> {senior.seniorGender}</p>
                  <p><strong>특이사항:</strong> {senior.specialNote}</p>
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
