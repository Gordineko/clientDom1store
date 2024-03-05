import React from "react";
import "../style/footer.css";

function Footer() {
  return (
    <footer>
      <section className="footer__content">
        <div className="container">
          <div className="footer__lists">
            <h1>DOM1STORE</h1>
            <ul className="footer__list">
              <span>Компания</span>
              <li>О компании</li>
              <li>Партнёры</li>
              <li>Правила продаж</li>
              <li>Новости</li>
            </ul>
            <ul className="footer__list">
              <span>Покупателям</span>
              <li>Доставка</li>
              <li>Гарантия</li>
              <li>Пуннкти выдачи</li>
              <li>Адреса</li>
            </ul>
            <ul className="footer__list">
              <span>Информация</span>
              <li>Поставщики</li>
              <li>Тендеры</li>
              <li>Благотварительность</li>
              <li>Партнёрская программа</li>
            </ul>
            <ul className="footer__list">
              <span>Контакты</span>
              <li>+38 (066) 321 0323</li>
              <li>swifsup@gmail.com</li>
              <li></li>
            </ul>
          </div>
          <div className="footer__confidentiality">
            <span>Политика Конфендициальности</span>
            <span>Соглашение на обратобку данных</span>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
