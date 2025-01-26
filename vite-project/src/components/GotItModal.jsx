// GotItModal.jsx
import React from "react";

function GotItModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null; // If modal is closed, return nothing

  return (
    <div className="modal">
      <div className="modal-content">
         {/* Close button (X) */}
         <button className="close-btn" onClick={onCancel}>X</button>
        <p>Are you sure you want to mark this item as purchased?</p>
        <button onClick={onConfirm}>Yes, Confirmed</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default GotItModal;
