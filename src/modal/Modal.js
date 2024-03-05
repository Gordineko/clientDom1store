import React, { useState, useEffect } from "react";
import "./modal.css";

const Modal = ({ isOpen }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen !== 0) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  }, [isOpen]);

  const modalStyle = {
    transform: isVisible ? "translate(50%, 0)" : "translateX(1000%)",
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-header">
        <p>Данные успешно обновлены</p>
      </div>
    </div>
  );
};

export default Modal;
