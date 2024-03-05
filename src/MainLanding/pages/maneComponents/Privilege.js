import React from "react";
import "./style/privilege.css";

import delivery from "../../image/icone/delivery.png";
import verify from "../../image/icone/verify.png";
import groceries from "../../image/icone/groceries.png";
import document from "../../image/icone/document.png";
import computer from "../../image/icone/computer.png";
import safebox from "../../image/icone/safebox.png";
import refund from "../../image/icone/refund.png";
import shield from "../../image/icone/shield.png";

function Privilege() {
  return (
    <section className="privilege">
      <div className="privilege__title">
        <h2>Наши преимущества</h2>
      </div>
      <div className="privilege__cards">
        <div className="privilege__cards_item">
          <img src={delivery} alt="404" />{" "}
          <span>Експресс доставка за 2 часа</span>
        </div>
        <div className="privilege__cards_item">
          <img src={verify} alt="404" />
          <span>Гарантия лучшего качества</span>
        </div>
        <div className="privilege__cards_item">
          <img src={groceries} alt="404" />
          <span>Самовывоз в 10 городах</span>
        </div>
        <div className="privilege__cards_item">
          <img src={document} alt="404" />{" "}
          <span>2 года сервистного обслуживания</span>
        </div>
        <div className="privilege__cards_item">
          <img src={computer} alt="404" />
          <span>Подключение оборудивания</span>
        </div>
        <div className="privilege__cards_item">
          <img src={safebox} alt="404" />
          <span>Бонус программа</span>
        </div>
        <div className="privilege__cards_item">
          <img src={refund} alt="404" />
          <span>Быстрый обмен и возврат</span>
        </div>
        <div className="privilege__cards_item">
          <img src={shield} alt="404" />
          <span>Бензсрочная рассрочка</span>
        </div>
      </div>
      <div className="privilege__promo">
        <div className="privilege__promo_stock">
          <div className="stock__txt">
            <h3>Не нашли ничего интересного?</h3>
            <span>Возможно вы найдёте что-то среди наших акций</span>
            <p> Все акции</p>
          </div>
        </div>
        <div className="privilege__promo_offers">
          <div className="offers__txt">
            <h3>Получайте самые интересные предложения первыми</h3>
            <input placeholder="Введите Email"></input>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Privilege;
