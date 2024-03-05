import React from "react";
import "./style/burger.css";
import prof from "../../image/icone/profile.png";
import rus from "../../image/icone/russia.png";
import ukr from "../../image/icone/ukraine.png";
import usa from "../../image/icone/united-states-of-america.png";
import google from "../../image/icone/game.png";
import apple from "../../image/icone/applestore.png";
import telegram from "../../image/company/telegram.png";
import vk from "../../image/company/vk.png";
import youtub from "../../image/company/youtube.png";
import { useContext } from "react";
import { CustomContext } from "../../../utils/Context";
import { useNavigate } from "react-router-dom";

function Burger({ isActive, handleClick, AuthClick }) {
  const navigate = useNavigate();
  const { users } = useContext(CustomContext);
  const loginHandler = () => {
    handleClick();
    AuthClick();
  };
  return (
    <div className={isActive ? "burger-menu active" : "burger-menu inactive"}>
      <div className="burger-menu_prew">
        <h1>Dom1store</h1>
        <button onClick={handleClick}>x</button>
      </div>

      {users.isAuth ? (
        <div
          className="burger-menu__profile"
          onClick={() => navigate("/personal")}
        >
          <div className="burger-menu__profile_img">
            <img src={prof} alt="404" />
          </div>
          <div className="profile__content">
            <div className="profile__content_txt">
              <div className="profile__content_reg">
                <span>Личный кобинет</span>
              </div>
            </div>
            <span>Вы успешно авторизованы</span>
          </div>
        </div>
      ) : (
        <div className="burger-menu__profile" onClick={AuthClick}>
          <div className="burger-menu__profile_img">
            <img src={prof} alt="404" />
          </div>
          <div className="profile__content">
            <div className="profile__content_txt" onClick={AuthClick}>
              <div className="profile__content_login">
                <span>Вход</span>
              </div>
              <div className="profile__content_reg">
                <span>Регистрация</span>
              </div>
            </div>
            <span>Авторизуйтесь для получения расширеных возможностей</span>
          </div>
        </div>
      )}

      <div className="burger-menu__sett">
        <ul>
          <li>
            Язык :
            <div className="burger-menu__sett-img">
              <img src={rus} alt="404" />
            </div>
            <div className="burger-menu__sett-img">
              <img src={ukr} alt="404" />
            </div>
            <div className="burger-menu__sett-img">
              <img src={usa} alt="404" />
            </div>
          </li>
          <li>
            Город :{" "}
            <div className="burger-menu__sett-city">
              <span>Днепр</span>
            </div>
            <div className="burger-menu__sett-city">
              <span>Киев</span>
            </div>
          </li>
        </ul>
      </div>
      <ul className="burger-menu__list">
        <li
          className="burger-menu__list-item"
          onClick={() => {
            navigate("/like");
          }}
        >
          <span>Понравившиеся товары</span>
        </li>
        <li className="burger-menu__list-item">
          <span>Справочный центр</span>
        </li>
        <li
          onClick={() => {
            navigate("/basket");
          }}
          className="burger-menu__list-item"
        >
          <span>Корзина</span>
        </li>
        <li className="burger-menu__list-item">
          <span>О нас</span>
        </li>
        <li className="burger-menu__list-item">
          <span>Контакты</span>
        </li>
        <li className="burger-menu__list-item">
          <span>Возврат товаров</span>
        </li>
        <li className="burger-menu__list-item">
          <span>Гарантия</span>
        </li>
      </ul>
      <div className="burger-menu__app">
        <span>Скачайте наши приложения</span>
        <div className="app__button_group">
          <div className="button_app">
            <img src={google} alt="404" />
            <div className="button_app__txt">
              <p>Скачать в</p>
              <p className="button_app__txt_store">Google Play</p>
            </div>
          </div>
          <div className="button_app">
            <img src={apple} alt="404" />
            <div className="button_app__txt">
              <p>Скачать в</p>
              <p className="button_app__txt_store">App Store</p>
            </div>
          </div>
        </div>
      </div>
      <div className="burger-menu__social">
        <p>Наши соц. сети</p>
        <div className="burger-menu__social-links">
          <img src={telegram} alt="404" />
          <img src={vk} alt="404" />
          <img src={youtub} alt="404" />
        </div>
      </div>
    </div>
  );
}

export default Burger;
