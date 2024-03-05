import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import "./order.css";
import { Link, useNavigate } from "react-router-dom";
import { CustomContext } from "../utils/Context";
import { Field, Form, Formik } from "formik";
import { check } from "../http/userAPI";
import logo from "../MainLanding/image/icone/dominoes.png";
import arrow from "../MainLanding/image/icone/free-icon-right-chevron-8563331.png";
import switchMenu from "../MainLanding/image/icone/switch.png";
import Select from "./SelectField";
import OrderModal from "../modal/OrderModal";
const SigninSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Поле должно быть заполнено"),
  orderEmail: Yup.string().required("Поле должно быть заполнено"),
  surname: Yup.string().required("Поле должно быть заполнено"),
  name: Yup.string().required("Поле должно быть заполнено"),
  delivery: Yup.string().required("Поле должно быть заполнено"),
});
function Order() {
  const options = [
    { value: "", label: "Выберите место доставки" },
    {
      value: "novaposhta #1 Дніпро, вул. Маршала Малиновського, 114",
      label: "#1 Дніпро, вул. Маршала Малиновського, 114",
    },
    {
      value: "novaposhta #2 Дніпро, просп. Богдана Хмельницького, 31Д",
      label: "#2 Дніпро, просп. Богдана Хмельницького, 31Д",
    },
    {
      value: "novaposhta #3 Дніпро, вул. Тверська, 1",
      label: "#3 Дніпро, вул. Тверська, 1",
    },
    {
      value: "#4 Дніпро, пл. Старомостова, 1Б",
      label: "#4 Дніпро, пл. Старомостова, 1Б",
    },
    {
      value:
        "novaposhta #5 Дніпро, вул. Бориса Кротова, 38 (с. Дороге, провул. Тютіна, 15а)",
      label:
        "#5 Дніпро, вул. Бориса Кротова, 38 (с. Дороге, провул. Тютіна, 15а)",
    },
    {
      value:
        "novaposhta #6 Дніпро, вул. Ударників, 27 (заїзд із вул. Івана Езау)",
      label: "#6 Дніпро, вул. Ударників, 27 (заїзд із вул. Івана Езау)",
    },
    {
      value: "novaposhta #7 Дніпро, просп. Олександра Поля (ран. Кірова), 8а",
      label: "#7 Дніпро, просп. Олександра Поля (ран. Кірова), 8а",
    },
    {
      value:
        "novaposhta #8 Дніпро, смт. Слобожанське, вул. Василя Сухомлинського, 61",
      label: "#8 Дніпро, смт. Слобожанське, вул. Василя Сухомлинського, 61",
    },
  ];
  const navigate = useNavigate();
  const { users, basket, setBasket, orders } = useContext(CustomContext);
  const currentUser = users.user;
  const [sumCost, setSumCost] = useState(0);
  const [sumDiscount, setSumDiscount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOper] = useState({
    1: false,
    2: false,
  });

  useEffect(() => {
    check().then((data) => {
      users.setUser(data);
      users.setIsAuth(true);
    });
  }, [users]);
  useEffect(() => {
    setSumCost(
      basket.reduce((accumulator, currentValue) => {
        const costSum = parseFloat(currentValue.price.replace(/[ ,]/g, ""));
        const costMain = costSum - costSum * currentValue.discount;
        const costVV = accumulator + costMain * currentValue.count;
        return Math.round(+costVV);
      }, 0)
    );
  }, [basket]);

  useEffect(() => {
    let totalDiscount = 0;

    basket.forEach((item) => {
      const costs = parseFloat(item.price.replace(/[ ,]/g, ""));
      const buyin = Math.round(costs - costs * item.discount);
      const discount = (costs - buyin) * item.count;
      totalDiscount += discount;
    });

    setSumDiscount(totalDiscount);
  }, [basket]);
  const openContent = (buttonIndex) => {
    setIsOper((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        if (key !== buttonIndex) {
          newState[key] = false;
        }
      });
      newState[buttonIndex] = !newState[buttonIndex];
      return newState;
    });
  };

  return (
    <>
      <header className="header-order">
        {isActive && <div className="overlay"></div>}
        <div className="container-header">
          <div
            className="header__logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <span className="logo">DOM1STORE</span>
          </div>
        </div>
      </header>
      <main className="main-order">
        <div className="container">
          <h2>Оформление заказа</h2>
          <div className="order__form">
            <span>Ваши контактные данные</span>
            <Formik
              initialValues={{
                phoneNumber: "",
                orderEmail: "",
                surname: "",
                name: "",
                delivery: "",
                payment: "basic",
                products: basket,
                cost: sumCost,
              }}
              validationSchema={SigninSchema}
              onSubmit={async (values) => {
                values.products = JSON.stringify(values.products);
                values.cost = sumCost;
                localStorage.removeItem("baskets");
                setBasket([]);
                try {
                  await orders.createOrder(values);
                } catch (error) {
                  console.error("Error creating order:", error);
                }
                setIsActive(true);
                // navigate(`/`);
              }}
            >
              {({ values, setValues, errors, touched }) => (
                <Form className="form">
                  <div className="order__form__content">
                    <ul className="item-content__list">
                      <li className="item-content__list-item">
                        <span className="item-content__list-item-txt">
                          Мобильный телеофон
                        </span>
                        <Field
                          name="phoneNumber"
                          placeholder={currentUser.surname}
                        />
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <div className="payment-err-msg">
                            {errors.phoneNumber}
                          </div>
                        ) : null}
                      </li>
                      <li className="item-content__list-item">
                        <span className="item-content__list-item-txt">
                          Електронная почта
                        </span>
                        <Field
                          name="orderEmail"
                          placeholder={currentUser.name}
                        ></Field>{" "}
                        {errors.orderEmail && touched.orderEmail ? (
                          <div className="payment-err-msg">
                            {errors.orderEmail}
                          </div>
                        ) : null}
                      </li>
                      <li className="item-content__list-item">
                        <span className="item-content__list-item-txt">Имя</span>
                        <Field
                          name="name"
                          placeholder={currentUser.patronymic}
                        ></Field>{" "}
                        {errors.name && touched.name ? (
                          <div className="payment-err-msg">{errors.name}</div>
                        ) : null}
                      </li>
                      <li className="item-content__list-item">
                        <span className="item-content__list-item-txt">
                          Фамилия
                        </span>
                        <Field
                          name="surname"
                          placeholder={currentUser.date}
                        ></Field>{" "}
                        {errors.surname && touched.surname ? (
                          <div className="payment-err-msg">
                            {errors.surname}
                          </div>
                        ) : null}
                      </li>
                    </ul>

                    <button className="item-content__list-button" type="submit">
                      Сохранить изменения
                    </button>
                    <div className="reservation">
                      <h2>Заказ</h2>
                      <div className="order__form__warning">
                        <p>
                          Согласно <Link> действующему законодательству</Link>{" "}
                          для оплаты заказа на сумму 30000 ₴ и более необходимо
                          обязательно подтвердить личность плательщика.
                          Подтвердить личность во время доставки можно:
                        </p>
                        <p className="warning__first">
                          1. С помощью приложения ДІЯ с наложением вашей{" "}
                          <Link>
                            {" "}
                            КЭП (квалифицированная электронная подпись)
                          </Link>
                          .
                        </p>
                        <p className="warning__second">
                          2. При осуществлении оплаты предоставить
                          уполномоченному лицу заверенные согласно оригиналу
                          копии следующих документов: ИНН (РНОКПП), страницы
                          паспорта, где содержатся Ваши фото и адрес
                          регистрации.
                        </p>
                      </div>
                      <div className="order__form__basket">
                        <p>
                          Продавец :<b>DOM1STORE</b>{" "}
                          <img
                            className="order__form__logo"
                            src={logo}
                            alt="404"
                          />
                        </p>
                        <ul className="basket__list">
                          {basket.map((item) => {
                            const costs = parseFloat(
                              item.price.replace(/[ ,]/g, "")
                            );
                            const buyin = Math.round(
                              costs - costs * item.discount
                            );
                            const num = +item.count;
                            return (
                              <li className="basket__list__item" key={item.id}>
                                <div className="item__img__container">
                                  <img
                                    src={
                                      process.env.REACT_APP_API_URL + item.img
                                    }
                                    alt="404"
                                  />
                                </div>
                                <span className="basket__list__item__name">
                                  {item.name}
                                </span>
                                <div className="basket__list__item__costs">
                                  <span>
                                    {item.discount === ""
                                      ? ""
                                      : buyin +
                                        " ₴" +
                                        " x " +
                                        item.count +
                                        " ед."}
                                  </span>
                                  <span
                                    className={
                                      item.discount === "0"
                                        ? " without-discount"
                                        : " with-discount"
                                    }
                                  >
                                    {costs + " ₴"}
                                  </span>
                                </div>{" "}
                                <div className="basket__list__item__costs-order">
                                  <span>{buyin * item.count + " ₴"}</span>
                                </div>
                              </li>
                            );
                          })}
                          <div
                            className="basket__list__item__edit"
                            onClick={() => {
                              navigate("/basket");
                            }}
                          >
                            Редактировать заказ
                          </div>
                        </ul>
                      </div>
                    </div>

                    <div className="delivery">
                      <h2>Доставка</h2>
                      <div className="delivery__section">
                        <div
                          className={
                            isOpen[1] === false
                              ? "section__post-office  "
                              : "section__post-office select"
                          }
                        >
                          <div
                            className="section__post-office__prev"
                            onClick={() => {
                              if (isOpen[2] === true) {
                                openContent(2);
                                openContent(1);
                                setValues((prevValues) => ({
                                  ...prevValues,
                                  delivery: "",
                                }));
                              } else openContent(1);
                            }}
                          >
                            <div className="prev__txt">
                              <div className="select__btn-group">
                                <img
                                  className={
                                    isOpen[1] === false
                                      ? "select-true"
                                      : "select-false"
                                  }
                                  src={switchMenu}
                                  alt="404"
                                />
                              </div>
                              <span>Отделение новой почты</span>
                            </div>
                            <span>Бесплатно</span>
                          </div>
                          <div
                            className={
                              isOpen[1] === false
                                ? "section__post-office__content"
                                : "section__post-office__content selected"
                            }
                          >
                            {/* <Field as="select" name="gender">
                          <option value="Мужчина">Отделение новой почты</option>
                          <option value="Женщина">Женщина</option>
                          <option value="Другое">Другое</option>
                        </Field> */}
                            <Field
                              component={Select}
                              name="delivery"
                              options={options}
                            />{" "}
                          </div>
                        </div>
                        <div
                          className={
                            isOpen[2] === false
                              ? "section__storehouse  "
                              : "section__storehouse select"
                          }
                        >
                          <div
                            className="section__storehouse__prev"
                            onClick={() => {
                              if (isOpen[1] === true) {
                                openContent(1);
                                openContent(2);
                                setValues((prevValues) => ({
                                  ...prevValues,
                                  delivery: "",
                                }));
                              } else openContent(2);
                            }}
                          >
                            <div className="prev__txt">
                              <div className="select__btn-group">
                                <img
                                  className={
                                    isOpen[2] === false
                                      ? "select-true"
                                      : "select-false"
                                  }
                                  src={switchMenu}
                                  alt="404"
                                />
                              </div>
                              <span>Из нашего магазина</span>
                            </div>
                            <span>Бесплатно</span>
                          </div>
                          <div
                            className={
                              isOpen[2] === false
                                ? "section__storehouse__content"
                                : "section__storehouse__content selected"
                            }
                          >
                            {/* <Field as="select" name="gender">
                          <option value="Мужчина">Отделение новой почты</option>
                          <option value="Женщина">Женщина</option>
                          <option value="Другое">Другое</option>
                        </Field> */}
                            <Field
                              component={Select}
                              name="delivery"
                              options={options}
                            />
                          </div>
                        </div>{" "}
                        {errors.delivery && touched.delivery ? (
                          <div className="payment-err-msg">
                            {errors.delivery}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="paymant">
                      <h2>Оплата</h2>
                      <p>Только наложеным плтежом (при получаение на почте)</p>
                    </div>
                  </div>
                  <div className="transition-block">
                    <div className="order-place__payment">
                      <div className="order-place__payment__promo">
                        <input
                          className="promo__input"
                          placeholder="Введите промокод"
                        ></input>
                        <div className="promo__btn">
                          Применить
                          <img src={arrow} alt="404" />
                        </div>
                      </div>
                      <div className="order-place__payment__ordering-content">
                        <div className="ordering-content_discount">
                          <span>Общая скидка :</span>
                          <span className="ordering-content_discount-txt">
                            - {sumDiscount} ₴
                          </span>
                        </div>
                        <div className="ordering-content_cost">
                          <span>Всего к оплате :</span>
                          <span className="ordering-content_cost-txt">
                            {sumCost} ₴
                          </span>
                        </div>

                        <button
                          className="ordering-content__submit"
                          type="submit"
                        >
                          Оплатить всё
                        </button>
                        <div className="ordering-content__description">
                          <span>
                            Отримання замовлення від 5 000 ₴ - 30 000 ₴ за
                            наявності документів. При оплаті готівкою від 30 000
                            ₴ необхідно надати документи для верифікації згідно
                            вимог Закону України від 06.12.2019 №361-IX
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <OrderModal isActive={isActive} click={setIsActive} />
      </main>
    </>
  );
}

export default Order;
