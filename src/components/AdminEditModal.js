// components/AdminEditModal.js
import React from "react";

export default function AdminEditModal({ seat, seating, onClose, onSave }) {
  const { row, col } = seat;
  const seatLabel = `${String.fromCharCode(65 + row)}-${col + 1}`;
  const currentType = seating[row][col].type;
  const options = ["available", "vip", "accessible", "elderly", "broken"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-xl max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Edit Seat {seatLabel}</h2>
        <select
          value={currentType}
          onChange={(e) => onSave(row, col, e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4"
        >
          {options.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button onClick={onClose} className="w-full bg-gray-300 py-2 rounded">Close</button>
      </div>
    </div>
  );
}