import React, { useContext, useEffect, useState } from "react";
import { CustomContext } from "../utils/Context";
import { Outlet, useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const { users, setUser } = useContext(CustomContext);
  const [activeButtonIndex, setActiveButtonIndex] = useState(1);

  const logOutUser = () => {
    users.setUser([]);
    users.setIsAuth(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const navigateClick = (buttonIndex, nav) => {
    setActiveButtonIndex(buttonIndex);
    navigate(nav);
  };

  return (
    <>
      <section className="admin-wrapper">
        <header className="admin__header">
          <div
            className="header__logo"
            onClick={() => {
              localStorage.removeItem("selectedType");
              navigate("/");
            }}
          >
            <span className="logo">DOM1STORE</span>
          </div>
          <ul className="admin__menu-list">
            <li
              className={
                activeButtonIndex === 1
                  ? "admin__menu-list__item chosen"
                  : "admin__menu-list__item"
              }
              onClick={() => {
                navigateClick(1, "/admin");
              }}
            >
              <span>Добавление товара</span>
            </li>
            <li
              className={
                activeButtonIndex === 2
                  ? "admin__menu-list__item chosen"
                  : "admin__menu-list__item"
              }
              onClick={() => {
                navigateClick(2, "orders");
              }}
            >
              <span>Онлайн заказы</span>
            </li>
            <li
              className={
                activeButtonIndex === 3
                  ? "admin__menu-list__item chosen"
                  : "admin__menu-list__item"
              }
              onClick={() => {
                navigateClick(3, "customers");
              }}
            >
              <span>Пользователи сайта</span>
            </li>
            <li className="admin__menu-list__item" onClick={logOutUser}>
              <span>Выйти с аккаунта</span>
            </li>
          </ul>
        </header>
        <main className="admin__content">
          <Outlet />
        </main>
      </section>
    </>
  );
}

export default Admin;
