import React from "react";
import "./notFound.css";
import Landing from "../MainLanding/Landing";
import Header from "../MainLanding/pages/Header";
import { useNavigate } from "react-router-dom";

function NotFaund() {
  const navigate = useNavigate();
  return (
    <>
      <header className="not-found__header">
        <div
          className="header__logo"
          onClick={() => {
            localStorage.removeItem("selectedType");
            navigate("/");
          }}
        >
          <span className="logo">DOM1STORE</span>
        </div>
      </header>
      <main className="not-found__main">
        <div className="not-found__content">
          <h2>Страница не найдена</h2>
          <span>404</span>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default NotFaund;
