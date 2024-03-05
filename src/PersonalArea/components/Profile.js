import React, { useContext, useEffect, useState } from "react";
import "../style/profile.css";
import avatar from "../../MainLanding/image/icone/avatar.png";
import product from "../../MainLanding/image/icone/product.png";
import mail from "../../MainLanding/image/icone/mail.png";
import bas from "../../MainLanding/image/icone/bus.png";
import lock from "../../MainLanding/image/icone/door-handle.png";
import bot from "../../MainLanding/image/icone/arrow.png";
import zeroBuy from "../../MainLanding/image/icone/zeroBuy.png";
import botpurp from "../../MainLanding/image/icone/bottom-purpur.png";
import { CustomContext } from "../../utils/Context";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { check, updateUser } from "../../http/userAPI";
import Loader from "../../MainLanding/Loader";
import Modal from "../../modal/Modal";
import Select from "react-select";

const options = [
  { value: "Мужчина", label: "Мужчина" },
  { value: "Женщина", label: "Женщина" },
  { value: "Другое", label: "Другое" },
];

function Profile() {
  const { users, setUser } = useContext(CustomContext);
  const currentUser = users.user;
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(0);
  const navigate = useNavigate();

  const [isOpen, setIsOper] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [editingActive, setEditingActive] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      check().finally(() => setLoading(false));
    }, 500);
  }, [save]);

  const logOutUser = () => {
    users.setUser([]);
    users.setIsAuth(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const openContent = (buttonIndex) => {
    setIsOper((prevState) => ({
      ...prevState,
      [buttonIndex]: !prevState[buttonIndex],
    }));
  };
  const editActivating = (buttonIndex) => {
    setEditingActive((prevState) => ({
      ...prevState,
      [buttonIndex]: !prevState[buttonIndex],
    }));
  };

  const toggleModal = () => {
    setIsOpenModal((prevState) =>
      prevState === 0 ? 1 : prevState === 1 ? 2 : 1
    );
  };

  return (
    <section className="profile">
      <h1>Личные данные</h1>
      <ul className="profile__list">
        <li
          className={
            isOpen[1] ? "profile__list-item-open" : "profile__list-item "
          }
          onClick={() => {
            openContent(1);
            if (editingActive[1] === true) {
              editActivating(1);
            }
          }}
        >
          <div className="list-item__content">
            <img src={avatar} alt="404" />
            <span>Личные данный</span>
          </div>
          <img src={bot} className="list-item__img-bot" alt="404" />
        </li>
        <div
          className={
            isOpen[1] ? "profile__item-content-open " : "profile__item-content "
          }
        >
          <Formik
            initialValues={{
              surname: "",
              name: "",
              patronymic: "",
              date: "",
              gender: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                await updateUser(values).then((data) => {
                  users.setUser(data);
                  users.setIsAuth(true);
                });
                setSave(!save);
                setEditingActive(0);
                toggleModal();
                resetForm(); // Сбросить значения полей формы
                console.log("Данные успешно обновлены:", values);
              } catch (error) {
                console.error(
                  "Ошибка при обновлении данных пользователя:",
                  error
                );
              }
            }}
          >
            <Form>
              <ul className="item-content__list">
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">Фамилия</span>
                  {editingActive[1] ? (
                    <Field
                      name="surname"
                      placeholder={currentUser.surname}
                    ></Field>
                  ) : (
                    <span>{currentUser.surname}</span>
                  )}
                </li>
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">Имя</span>
                  {editingActive[1] ? (
                    <Field name="name" placeholder={currentUser.name}></Field>
                  ) : (
                    <span>{currentUser.name}</span>
                  )}
                </li>
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">Отчество</span>

                  {editingActive[1] ? (
                    <Field
                      name="patronymic"
                      placeholder={currentUser.patronymic}
                    ></Field>
                  ) : (
                    <span>
                      {currentUser.patronymic === undefined
                        ? "-"
                        : currentUser.patronymic}
                    </span>
                  )}
                </li>
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">
                    Дата рождения
                  </span>

                  {editingActive[1] ? (
                    <Field name="date" placeholder={currentUser.date}></Field>
                  ) : (
                    <span>
                      {currentUser.date === undefined ? "-" : currentUser.date}
                    </span>
                  )}
                </li>
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">Пол</span>

                  {editingActive[1] ? (
                    <Field as="select" name="gender">
                      <option value="Мужчина">Мужчина</option>
                      <option value="Женщина">Женщина</option>
                      <option value="Другое">Другое</option>
                    </Field>
                  ) : (
                    <span>
                      {currentUser.gender === undefined
                        ? "-"
                        : currentUser.gender}
                    </span>
                  )}
                </li>
              </ul>
              {editingActive[1] ? (
                <button className="item-content__list-button" type="submit">
                  Сохранить изменения
                </button>
              ) : (
                ""
              )}
            </Form>
          </Formik>

          {editingActive[1] ? (
            ""
          ) : (
            <button
              className="item-content__list-button"
              onClick={() => {
                editActivating(1);
              }}
            >
              Редактировать
            </button>
          )}
        </div>
        <li
          className={
            isOpen[2] ? "profile__list-item-open" : "profile__list-item "
          }
          onClick={() => {
            openContent(2);
          }}
        >
          <div className="list-item__content">
            <img src={product} alt="404" />
            <span>Мои полученые заказы</span>
          </div>
          <img src={bot} className="list-item__img-bot" alt="404" />
        </li>
        <div
          className={
            isOpen[2] ? "profile__item-content-open " : "profile__item-content "
          }
        >
          {currentUser.obtainedProd === undefined ? (
            <div className="obtained">
              <span>Вы ещё не совершали покупки</span>
              <div className="obtained__image">
                <img src={zeroBuy}></img>
              </div>
            </div>
          ) : (
            <ul className="item-content__list">
              <li className="item-content__list-item">
                <span className="item-content__list-item-txt"></span>
              </li>
            </ul>
          )}

          <button
            className="item-content__list-button"
            onClick={() => {
              editActivating(2);
            }}
          >
            Редактировать
          </button>
        </div>
        <li
          className={
            isOpen[3] ? "profile__list-item-open" : "profile__list-item "
          }
          onClick={() => {
            openContent(3);
            if (editingActive[3] === true) {
              editActivating(3);
            }
          }}
        >
          <div className="list-item__content">
            <img src={mail} alt="404" />
            <span>Контакты</span>
          </div>
          <img src={bot} className="list-item__img-bot" alt="404" />
        </li>
        <div
          className={
            isOpen[3] ? "profile__item-content-open " : "profile__item-content "
          }
        >
          <Formik
            initialValues={{
              surname: "",
              name: "",
              patronymic: "",
              date: "",
              gender: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                await updateUser(values).then((data) => {
                  users.setUser(data);
                  users.setIsAuth(true);
                });
                setSave(!save);
                setEditingActive(0);
                toggleModal();
                resetForm(); // Сбросить значения полей формы
                console.log("Данные успешно обновлены:", values);
              } catch (error) {
                console.error(
                  "Ошибка при обновлении данных пользователя:",
                  error
                );
              }
            }}
          >
            <Form>
              <ul className="item-content__list">
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">
                    Подтверждённый телефон
                  </span>
                  {editingActive[3] ? (
                    <Field
                      name="phoneNumber"
                      placeholder={currentUser.phoneNumber}
                    ></Field>
                  ) : (
                    <span>
                      {currentUser.phoneNumber === undefined
                        ? "-"
                        : currentUser.phoneNumber}
                    </span>
                  )}
                </li>
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">
                    Дополнительный телефон
                  </span>

                  {editingActive[3] ? (
                    <Field
                      name="secondPhoneNumber"
                      placeholder={currentUser.secondPhoneNumber}
                    ></Field>
                  ) : (
                    <span>
                      {currentUser.secondPhoneNumber === undefined
                        ? "-"
                        : currentUser.secondPhoneNumber}
                    </span>
                  )}
                </li>
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">
                    электронная почта
                  </span>
                  {editingActive[3] ? (
                    <Field name="email" placeholder={currentUser.email}></Field>
                  ) : (
                    <span>
                      {currentUser.email === undefined
                        ? "-"
                        : currentUser.email}
                    </span>
                  )}
                </li>
              </ul>
              {editingActive[3] ? (
                <button className="item-content__list-button" type="submit">
                  Сохранить изменения
                </button>
              ) : (
                ""
              )}
            </Form>
          </Formik>

          {editingActive[3] ? (
            ""
          ) : (
            <button
              className="item-content__list-button"
              onClick={() => {
                editActivating(3);
              }}
            >
              Редактировать
            </button>
          )}
        </div>
        <li
          className={
            isOpen[4] ? "profile__list-item-open" : "profile__list-item "
          }
          onClick={() => {
            openContent(4);
          }}
        >
          <div className="list-item__content">
            <img src={bas} alt="404" />
            <span>Адрес доставки</span>
          </div>

          <img src={bot} className="list-item__img-bot" alt="404" />
        </li>
        <div
          className={
            isOpen[4] ? "profile__item-content-open " : "profile__item-content "
          }
        >
          <Formik
            initialValues={{
              surname: "",
              name: "",
              patronymic: "",
              date: "",
              gender: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                await updateUser(values).then((data) => {
                  users.setUser(data);
                  users.setIsAuth(true);
                });
                setSave(!save);
                setEditingActive(0);
                toggleModal();
                resetForm(); // Сбросить значения полей формы
                console.log("Данные успешно обновлены:", values);
              } catch (error) {
                console.error(
                  "Ошибка при обновлении данных пользователя:",
                  error
                );
              }
            }}
          >
            <Form>
              <ul className="item-content__list">
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">Ваш адрес</span>

                  {editingActive[4] ? (
                    <Field
                      name="address"
                      placeholder={currentUser.secondPhoneNumber}
                    ></Field>
                  ) : (
                    <span>
                      {currentUser.address === undefined
                        ? "-"
                        : currentUser.address}
                    </span>
                  )}
                </li>
              </ul>
              {editingActive[4] ? (
                <button className="item-content__list-button" type="submit">
                  Сохранить изменения
                </button>
              ) : (
                ""
              )}
            </Form>
          </Formik>

          {editingActive[4] ? (
            ""
          ) : (
            <button
              className="item-content__list-button"
              onClick={() => {
                editActivating(4);
              }}
            >
              Редактировать
            </button>
          )}
        </div>
        <li
          className={
            isOpen[5] ? "profile__list-item-open" : "profile__list-item "
          }
          onClick={() => {
            openContent(5);
          }}
        >
          <div className="list-item__content">
            <img src={lock} alt="404" />
            <span>Логин</span>
          </div>
          <img src={bot} className="list-item__img-bot" alt="404" />
        </li>
        <div
          className={
            isOpen[5] ? "profile__item-content-open " : "profile__item-content "
          }
        >
          {" "}
          <Formik
            initialValues={{
              surname: "",
              name: "",
              patronymic: "",
              date: "",
              gender: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                await updateUser(values).then((data) => {
                  users.setUser(data);
                  users.setIsAuth(true);
                });
                setSave(!save);
                setEditingActive(0);
                toggleModal();
                resetForm(); // Сбросить значения полей формы
                console.log("Данные успешно обновлены:", values);
              } catch (error) {
                console.error(
                  "Ошибка при обновлении данных пользователя:",
                  error
                );
              }
            }}
          >
            <Form>
              <ul className="item-content__list">
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">
                    Логин (телефон)
                  </span>

                  {editingActive[5] ? (
                    <Field
                      name="phoneNumber"
                      placeholder={currentUser.phoneNumber}
                    ></Field>
                  ) : (
                    <span>
                      {currentUser.phoneNumber === undefined
                        ? "-"
                        : currentUser.phoneNumber}
                    </span>
                  )}
                </li>
                <li className="item-content__list-item">
                  <span className="item-content__list-item-txt">
                    Логин (электронная почта)
                  </span>

                  {editingActive[5] ? (
                    <Field name="email" placeholder={currentUser.email}></Field>
                  ) : (
                    <span>
                      {currentUser.email === undefined
                        ? "-"
                        : currentUser.email}
                    </span>
                  )}
                </li>
              </ul>
              {editingActive[5] ? (
                <button className="item-content__list-button" type="submit">
                  Сохранить изменения
                </button>
              ) : (
                ""
              )}
            </Form>
          </Formik>
          {editingActive[5] ? (
            ""
          ) : (
            <button
              className="item-content__list-button"
              onClick={() => {
                editActivating(5);
              }}
            >
              Редактировать
            </button>
          )}
        </div>
      </ul>
      <button className="item-content__list-button" onClick={logOutUser}>
        Выйти с аккаунта
      </button>
      <Modal isOpen={isOpenModal} onClose={toggleModal} />
    </section>
  );
}

export default Profile;
