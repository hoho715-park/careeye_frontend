import React, { useState, useEffect } from "react";
import "../styles/SeniorInfo.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const SeniorInfo = () => {
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState("all");
  const [allSeniors, setAllSeniors] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSenior, setSelectedSenior] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editSenior, setEditSenior] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8080/senior/list/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setAllSeniors(data);
        setSearchResults("all");
      })
      .catch((err) => console.error("시니어 조회 오류:", err));
  }, [userId]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchName.trim() === "") {
      setSearchResults("all");
      return;
    }

    const keyword = searchName.replace(/\s+/g, "");

    const filtered = allSeniors.filter((senior) => {
      const fields = {
        name: senior.seniorName || senior.name || "",
        room: senior.roomNumber || senior.room || "",
        seniorId: senior.seniorId || senior.id || "",
        hospitalId: senior.hospitalId || senior.facilityId || "",
      };

      return String(fields[searchType]).replace(/\s+/g, "") === keyword;
    });

    setSearchResults(filtered.length > 0 ? filtered : "not-found");
  };

  const renderList = searchResults === "all" ? allSeniors : searchResults;

  const openDeleteModal = (senior) => {
    setSelectedSenior(senior);
    setShowDeleteModal(true);
  };

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

  const openEditModal = (senior) => {
    setEditSenior({ ...senior });
    setShowEditModal(true);
  };

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

  const getField = (senior, ...keys) => {
    for (const key of keys) {
      if (senior[key] !== undefined && senior[key] !== null) {
        return senior[key];
      }
    }
    return "-";
  };

  const getTypeLabel = () => {
    switch (searchType) {
      case "name":
        return "이름";
      case "room":
        return "방 호수";
      case "seniorId":
        return "시니어 ID";
      case "hospitalId":
        return "요양시설 ID";
      default:
        return "이름";
    }
  };

  return (
    <div className="senior-info-container">
      <div className="senior-info-content">
        <h2 className="senior-info-title">시니어 정보 조회</h2>

        <form className="search-form" onSubmit={handleSearch}>

          {/* 🔵 커스텀 드롭다운 */}
          <div className="custom-select" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span>{getTypeLabel()}</span>
            <div className={`arrow ${dropdownOpen ? "open" : ""}`}>▾</div>
          </div>

          {dropdownOpen && (
            <div className="custom-options">
              <div className="option" onClick={() => { setSearchType("name"); setDropdownOpen(false); }}>이름</div>
              <div className="option" onClick={() => { setSearchType("room"); setDropdownOpen(false); }}>방 호수</div>
              <div className="option" onClick={() => { setSearchType("seniorId"); setDropdownOpen(false); }}>시니어 ID</div>
              <div className="option" onClick={() => { setSearchType("hospitalId"); setDropdownOpen(false); }}>요양시설 ID</div>
            </div>
          )}

          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <button className="search-btn">검색</button>
        </form>

        <div className="result-section">
          {searchResults === "not-found" ? (
            <p className="not-found-text">❌ 해당 정보의 시니어를 찾을 수 없습니다.</p>
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

      {showDeleteModal && selectedSenior && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">⚠️</div>

            <p className="modal-message">
              정말 <span className="senior-name">{getField(selectedSenior, "seniorName", "name")}</span> 님을 삭제하시겠습니까?
            </p>

            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmDelete}>삭제하기</button>
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

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
                  setEditSenior({ ...editSenior, seniorName: e.target.value, name: e.target.value })
                }
              />

              <label>요양시설 ID</label>
              <input
                type="text"
                value={editSenior.hospitalId || editSenior.facilityId || ""}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, hospitalId: e.target.value, facilityId: e.target.value })
                }
              />

              <label>호실</label>
              <input
                type="text"
                value={editSenior.roomNumber || editSenior.room || ""}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, roomNumber: e.target.value, room: e.target.value })
                }
              />

              <label>생년월일</label>
              <input
                type="date"
                value={editSenior.seniorBirth || editSenior.birthDate || ""}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, seniorBirth: e.target.value, birthDate: e.target.value })
                }
              />

              <label>성별</label>
              <select
                value={editSenior.seniorGender || editSenior.gender || "남"}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, seniorGender: e.target.value, gender: e.target.value })
                }
              >
                <option value="남">남</option>
                <option value="여">여</option>
              </select>

              <label>특이사항</label>
              <textarea
                value={editSenior.specialNote || editSenior.notes || ""}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, specialNote: e.target.value, notes: e.target.value })
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
