import React, { useState, useEffect } from "react";
import "../styles/SeniorInfo.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const SeniorInfo = () => {
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState("all");
  const [allSeniors, setAllSeniors] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSenior, setSelectedSenior] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editSenior, setEditSenior] = useState(null);

  const userId = localStorage.getItem("userId");

  /* 🔵 전체 목록 불러오기 */
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8080/senior/list/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("받아온 데이터:", data); // 데이터 구조 확인용
        setAllSeniors(data);
        setSearchResults("all");
      })
      .catch((err) => console.error("시니어 조회 오류:", err));
  }, [userId]);

  /* 🔍 검색 기능 */
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchName.trim() === "") {
      setSearchResults("all");
      return;
    }

    const filtered = allSeniors.filter((senior) => {
      const name = senior.seniorName || senior.name || "";
      return name.replace(/\s+/g, "") === searchName.replace(/\s+/g, "");
    });

    setSearchResults(filtered.length > 0 ? filtered : "not-found");
  };

  const renderList = searchResults === "all" ? allSeniors : searchResults;

  /* 🗑 삭제 모달 열기 */
  const openDeleteModal = (senior) => {
    setSelectedSenior(senior);
    setShowDeleteModal(true);
  };

  /* 🗑 삭제 실행 */
  const confirmDelete = () => {
    const seniorId = selectedSenior.seniorId || selectedSenior.id;
    fetch(`http://localhost:8080/senior/delete/${seniorId}`, {
      method: "DELETE",
    })
      .then(() => {
        setShowDeleteModal(false);
        window.location.reload();
      })
      .catch((err) => console.error("삭제 오류:", err));
  };

  /* ✏ 수정 모달 열기 */
  const openEditModal = (senior) => {
    setEditSenior({ ...senior });
    setShowEditModal(true);
  };

  /* ✏ 수정 실행 */
  const handleUpdate = () => {
    const seniorId = editSenior.seniorId || editSenior.id;
    fetch(`http://localhost:8080/senior/update/${seniorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editSenior),
    })
      .then(() => {
        setShowEditModal(false);
        window.location.reload();
      })
      .catch((err) => console.error("수정 오류:", err));
  };

  /* 필드값 가져오기 헬퍼 함수 */
  const getField = (senior, ...keys) => {
    for (const key of keys) {
      if (senior[key] !== undefined && senior[key] !== null) {
        return senior[key];
      }
    }
    return "-";
  };

  return (
    <div className="senior-info-container">
      <div className="senior-info-content">
        <h2 className="senior-info-title">시니어 정보 조회</h2>

        {/* 🔍 검색 */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="시니어 이름을 입력하세요"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button className="search-btn">검색</button>
        </form>

        <div className="result-section">
          {searchResults === "not-found" ? (
            <p className="not-found-text">❌ 해당 이름의 시니어를 찾을 수 없습니다.</p>
          ) : (
            <div className="result-list">
              {renderList.map((senior, index) => (
                <div
                  key={index}
                  className={`senior-card ${
                    getField(senior, "seniorGender", "gender") === "여" 
                      ? "female-border" 
                      : "male-border"
                  }`}
                >
                  {/* 아이콘 묶음 */}
                  <div className="card-top-icons">
                    <FaEdit className="edit-icon" onClick={() => openEditModal(senior)} />
                    <FaTrashAlt className="delete-icon" onClick={() => openDeleteModal(senior)} />
                  </div>

                  <h3>{getField(senior, "seniorName", "name")}</h3>
                  
                  <div className="card-info">
                    <p><strong>🆔 시니어 ID:</strong> {getField(senior, "seniorId", "id")}</p>
                    <p><strong>🏥 요양시설 ID:</strong> {getField(senior, "hospitalId", "facilityId")}</p>
                    <p><strong>🚪 호실:</strong> {getField(senior, "roomNumber", "room")}</p>
                    <p><strong>🎂 생년월일:</strong> {getField(senior, "seniorBirth", "birthDate")}</p>
                    <p><strong>👤 성별:</strong> {getField(senior, "seniorGender", "gender")}</p>
                    <p><strong>📝 특이사항:</strong> {getField(senior, "specialNote", "notes")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =======================
          삭제 모달
      ======================== */}
      {showDeleteModal && selectedSenior && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">⚠️</div>

            <p className="modal-message">
              정말 <span className="senior-name">
                {getField(selectedSenior, "seniorName", "name")}
              </span> 님을 삭제하시겠습니까?
            </p>

            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmDelete}>삭제하기</button>
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* =======================
          수정 모달
      ======================== */}
      {showEditModal && editSenior && (
        <div className="modal-overlay">
          <div className="edit-modal-box">
            <h3 className="edit-modal-title">시니어 정보 수정하기</h3>

            <form className="edit-form">
              <label>이름</label>
              <input
                type="text"
                value={editSenior.seniorName || editSenior.name || ""}
                onChange={(e) =>
                  setEditSenior({ 
                    ...editSenior, 
                    seniorName: e.target.value,
                    name: e.target.value 
                  })
                }
              />

              <label>요양시설 ID</label>
              <input
                type="text"
                value={editSenior.hospitalId || editSenior.facilityId || ""}
                onChange={(e) =>
                  setEditSenior({ 
                    ...editSenior, 
                    hospitalId: e.target.value,
                    facilityId: e.target.value 
                  })
                }
              />

              <label>호실</label>
              <input
                type="text"
                value={editSenior.roomNumber || editSenior.room || ""}
                onChange={(e) =>
                  setEditSenior({ 
                    ...editSenior, 
                    roomNumber: e.target.value,
                    room: e.target.value 
                  })
                }
              />

              <label>생년월일</label>
              <input
                type="date"
                value={editSenior.seniorBirth || editSenior.birthDate || ""}
                onChange={(e) =>
                  setEditSenior({ 
                    ...editSenior, 
                    seniorBirth: e.target.value,
                    birthDate: e.target.value 
                  })
                }
              />

              <label>성별</label>
              <select
                value={editSenior.seniorGender || editSenior.gender || "남"}
                onChange={(e) =>
                  setEditSenior({ 
                    ...editSenior, 
                    seniorGender: e.target.value,
                    gender: e.target.value 
                  })
                }
              >
                <option value="남">남</option>
                <option value="여">여</option>
              </select>

              <label>특이사항</label>
              <textarea
                value={editSenior.specialNote || editSenior.notes || ""}
                onChange={(e) =>
                  setEditSenior({ 
                    ...editSenior, 
                    specialNote: e.target.value,
                    notes: e.target.value 
                  })
                }
              />
            </form>

            <div className="modal-buttons">
              <button className="update-btn" onClick={handleUpdate}>수정하기</button>
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SeniorInfo;