import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const SortableSeniorCard = ({ senior, openEditModal, openDeleteModal }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: senior.seniorId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`senior-card ${
        senior.seniorGender === "여" ? "female-border" : "male-border"
      }`}
    >
      <div className="card-top-icons">
        <FaEdit className="edit-icon" onClick={() => openEditModal(senior)} />
        <FaTrashAlt className="delete-icon" onClick={() => openDeleteModal(senior)} />
      </div>

      <h3>{senior.seniorName}</h3>
      <p><strong>시니어 ID:</strong> {senior.seniorId}</p>
      <p><strong>요양시설 ID:</strong> {senior.hospitalId}</p>
      <p><strong>호실:</strong> {senior.roomNumber}</p>
      <p><strong>생년월일:</strong> {senior.seniorBirth}</p>
      <p><strong>성별:</strong> {senior.seniorGender}</p>
      <p><strong>특이사항:</strong> {senior.specialNote}</p>
    </div>
  );
};

export default SortableSeniorCard;
