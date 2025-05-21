// components/ConfirmModal.js
import React from "react";

export default function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-xl max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Reset Confirmation</h2>
        <p className="mb-4 text-sm">Are you sure you want to reset the entire seating plan?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-1 bg-red-500 text-white rounded">Reset</button>
        </div>
      </div>
    </div>
  );
}
