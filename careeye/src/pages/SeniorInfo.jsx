import React, { useState, useEffect } from "react";
import "../styles/SeniorInfo.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

// DND Kit import
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableSeniorCard from "./SortableSeniorCard";

const SeniorInfo = () => {
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState("all");
  const [allSeniors, setAllSeniors] = useState([]);

  const [items, setItems] = useState([]); // 🔥 드래그 정렬용 ID 배열

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
        setAllSeniors(data);
        setItems(data.map((s) => s.seniorId)); // 🔥 카드 순서 관리용 ID 배열
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

    const filtered = allSeniors.filter(
      (senior) =>
        senior.seniorName.replace(/\s+/g, "") === searchName.replace(/\s+/g, "")
    );

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
    fetch(`http://localhost:8080/senior/delete/${selectedSenior.seniorId}`, {
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
    fetch(`http://localhost:8080/senior/update/${editSenior.seniorId}`, {
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

  /* 🔥 드래그 종료 시 실행 */
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.indexOf(active.id);
        const newIndex = prevItems.indexOf(over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
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

              {/* ⭐ DND 컨텍스트 시작 */}
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                  {items.map((id) => {
                    const senior = renderList.find((s) => s.seniorId === id);
                    if (!senior) return null;

                    return (
                      <SortableSeniorCard
                        key={senior.seniorId}
                        senior={senior}
                        openEditModal={openEditModal}
                        openDeleteModal={openDeleteModal}
                      />
                    );
                  })}
                </SortableContext>
              </DndContext>
              {/* ⭐ DND 끝 */}

            </div>
          )}
        </div>
      </div>

      {/* 삭제 모달 */}
      {showDeleteModal && selectedSenior && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">⚠️</div>

            <p className="modal-message">
              정말 <span className="senior-name">{selectedSenior.seniorName}</span> 님을
              삭제하시겠습니까?
            </p>

            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmDelete}>삭제하기</button>
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {showEditModal && editSenior && (
        <div className="modal-overlay">
          <div className="edit-modal-box">
            <h3 className="edit-modal-title">시니어 정보 수정하기</h3>

            <form className="edit-form">
              <label>이름</label>
              <input
                type="text"
                value={editSenior.seniorName}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, seniorName: e.target.value })
                }
              />

              <label>요양시설 ID</label>
              <input
                type="text"
                value={editSenior.hospitalId}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, hospitalId: e.target.value })
                }
              />

              <label>호실</label>
              <input
                type="text"
                value={editSenior.roomNumber}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, roomNumber: e.target.value })
                }
              />

              <label>생년월일</label>
              <input
                type="date"
                value={editSenior.seniorBirth}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, seniorBirth: e.target.value })
                }
              />

              <label>성별</label>
              <select
                value={editSenior.seniorGender}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, seniorGender: e.target.value })
                }
              >
                <option value="남">남</option>
                <option value="여">여</option>
              </select>

              <label>특이사항</label>
              <textarea
                value={editSenior.specialNote}
                onChange={(e) =>
                  setEditSenior({ ...editSenior, specialNote: e.target.value })
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
