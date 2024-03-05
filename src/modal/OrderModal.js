import React from "react";
import "./orderModal.css";
import thanks from "../MainLanding/image/icone/order-complit.png";
import { useNavigate } from "react-router-dom";
function OrderModal({ click, isActive }) {
  const navigate = useNavigate();
  return (
    <div className={isActive ? "order__modal-active" : "order__modal"}>
      <div className="order__modal__container-img">
        <img src={thanks} alt="404" />
      </div>

      <h2>Спасибо за заказ</h2>
      <div className="order__modal__content-txt">
        <span>
          Ваш заказ приянт в обработку . Мы свяжемся c вами в ближайшее время
        </span>
      </div>
      <button
        className="order__modal__btn"
        onClick={() => {
          click(false);
          navigate("/");
        }}
      >
        Готово
      </button>
    </div>
  );
}

export default OrderModal;
