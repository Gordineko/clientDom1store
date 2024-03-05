import React, { useEffect } from "react";
import Header from "../MainLanding/pages/Header";
import { useContext } from "react";
import { CustomContext } from "../utils/Context";
import { Outlet, useNavigate } from "react-router-dom";
import "./style/personal.css";
import avatar from "../MainLanding/image/icone/avatar.png";
import like from "../MainLanding/image/icone/like.png";
import sell from "../MainLanding/image/icone/promotions.png";
import box from "../MainLanding/image/icone/box.png";
import sms from "../MainLanding/image/icone/message-on-phone.png";
import { useState } from "react";
import Footer from "../MainLanding/pages/Footer";
import { check } from "../http/userAPI";
import Loader from "../MainLanding/Loader";

function PersonalArea() {
  const { users } = useContext(CustomContext);
  const [loading, setLoading] = useState(true);
  const [activeButtonIndex, setActiveButtonIndex] = useState(1);

  const navigate = useNavigate();
  const currentUser = users.user;

  useEffect(() => {
    const timer = setTimeout(() => {
      check()
        .then((data) => {
          users.setUser(data);
          users.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    }, 500);
  }, [users]);

  const handleButtonClick = (buttonIndex, nav) => {
    setActiveButtonIndex(buttonIndex);
    navigate(nav);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <section className="personal container">
        <div className="personal__content">
          <div className="personal__pofile">
            <div
              onClick={() => {
                handleButtonClick(1, "/personal");
              }}
              className={
                activeButtonIndex === 1
                  ? "personal__pofile-date active"
                  : "personal__pofile-date"
              }
            >
              <img src={avatar} alt="404" />
              <div className="pofile-date__txt">
                <span>{currentUser.email}</span>
              </div>
            </div>
            <ul className="personal__pofile-list">
              <li
                className={
                  activeButtonIndex === 2
                    ? "personal__pofile-list_item active"
                    : "personal__pofile-list_item"
                }
                onClick={() => {
                  handleButtonClick(2, "orders");
                }}
              >
                <img src={box} alt="404" />
                <span>Мои заказы</span>
              </li>
              <li
                className={
                  activeButtonIndex === 3
                    ? "personal__pofile-list_item active"
                    : "personal__pofile-list_item"
                }
                onClick={() => {
                  handleButtonClick(3, "desired");
                }}
              >
                <img src={like} alt="404" />
                <span> Список желаемого</span>
              </li>
              <li
                className={
                  activeButtonIndex === 4
                    ? "personal__pofile-list_item active"
                    : "personal__pofile-list_item"
                }
                onClick={() => {
                  handleButtonClick(4, "stock");
                }}
              >
                <img src={sell} alt="404" />
                <span>Участие в акциях</span>
              </li>
              <li
                className={
                  activeButtonIndex === 5
                    ? "personal__pofile-list_item active"
                    : "personal__pofile-list_item"
                }
                onClick={() => {
                  handleButtonClick(5, "sms");
                }}
              >
                <img src={sms} alt="404" />
                <span>Рассылки</span>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PersonalArea;
