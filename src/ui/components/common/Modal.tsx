import React from "react";
import "./Modal.css";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button onClick={onClose}>Annuler</button>
          <button onClick={onConfirm}>Valider</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
