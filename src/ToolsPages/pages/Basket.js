import React, { useEffect, useState } from "react";
import "../style/basket.css";
import Header from "../../MainLanding/pages/Header";
import Footer from "../../MainLanding/pages/Footer";
import { CustomContext } from "../../utils/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import x from "../../MainLanding/image/icone/x.png";
import arrow from "../../MainLanding/image/icone/free-icon-right-chevron-8563331.png";
import shop from "../../MainLanding/image/icone/free-icon-shopping-cart-5381441.png";
function Basket() {
  const { basket, setBasket, count } = useContext(CustomContext);
  const [sumCost, setSumCost] = useState([]);
  const [sumDiscount, setSumDiscount] = useState([]);

  const navigate = useNavigate();

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

  function clearBusketItem(id) {
    const itemIndex = basket.findIndex((item) => item.id === id);
    const updatedBasket = [...basket];
    updatedBasket.splice(itemIndex, 1);
    setBasket(updatedBasket);
    localStorage.setItem("baskets", JSON.stringify(updatedBasket));
  }
  function clearBusket() {
    const clearBasket = [];
    setBasket([]);
    localStorage.setItem("baskets", JSON.stringify(clearBasket));
  }

  function CauntBusketItem(meaning, id) {
    const itemIndex = basket.findIndex((item) => item.id === id);
    const updatedBasket = [...basket];
    if (meaning === "decrease") {
      updatedBasket[itemIndex].count -= 1;
      setBasket(updatedBasket);

      localStorage.setItem("baskets", JSON.stringify(updatedBasket));
    } else if (meaning === "increase") {
      updatedBasket[itemIndex].count += 1;
      setBasket(updatedBasket);
      localStorage.setItem("baskets", JSON.stringify(updatedBasket));
    }
  }

  return (
    <>
      <Header />
      {basket.length > 0 ? (
        <div className="basket-place container">
          <div className="basket-place__title-content">
            <div className="basket-place__title">
              <h2>Ваша корзина</h2>
              <span>{count} товара</span>
            </div>
            <div className="basket-place__tools">
              <span
                className="basket-place__tools-nav"
                onClick={() => {
                  navigate("/");
                }}
              >
                Продолжить покупки
              </span>
              <span className="basket-place__tools-clear" onClick={clearBusket}>
                Очистить корзину
              </span>
            </div>
          </div>
          <div className="basket-place__content">
            <ul className="basket-place__content-list">
              {basket.map((item) => {
                const costs = parseFloat(item.price.replace(/[ ,]/g, ""));
                const buyin = Math.round(costs - costs * item.discount);
                const num = +item.count;

                return (
                  <li className="basket-place__content-list_item" key={item.id}>
                    <img
                      src={process.env.REACT_APP_API_URL + item.img}
                      alt="404"
                    />
                    <span className="content-list_item-name">{item.name}</span>

                    <div className="content-list_item__costs">
                      <span>
                        {item.discount === "" ? "" : buyin * item.count + " ₴"}
                      </span>
                      <span
                        className={
                          item.discount === "0"
                            ? " without-discount"
                            : " with-discount"
                        }
                      >
                        {item.discount === "0" ? "" : costs * item.count + " ₴"}
                      </span>
                    </div>
                    <div className="content-list_item__quantity">
                      <span
                        className={
                          num < 2
                            ? "quantity__decrease disable-click"
                            : "quantity__decrease"
                        }
                        onClick={() => {
                          CauntBusketItem("decrease", item.id);
                        }}
                      >
                        -
                      </span>
                      <span className="quantity__conclusion">{item.count}</span>
                      <span
                        className="quantity__increase"
                        onClick={() => {
                          CauntBusketItem("increase", item.id);
                        }}
                      >
                        +
                      </span>
                    </div>
                    <div className="basket-place__content-list_item-img">
                      <img
                        src={x}
                        alt="404"
                        onClick={() => {
                          clearBusketItem(item.id);
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="basket-place__payment">
              <div className="basket-place__payment_discount">
                <span>Общая скидка :</span>
                <span className="basket-place__payment_discount-txt">
                  - {sumDiscount} ₴
                </span>
              </div>
              <div className="basket-place__payment_cost">
                <span>Всего к оплате :</span>
                <span className="basket-place__payment_cost-txt">
                  {sumCost} ₴
                </span>
              </div>
              <div className="basket-place__payment-form">
                <div className="basket-place__payment-form__group">
                  <input
                    className="basket-place__payment-form__input"
                    placeholder="Введите промокод"
                  ></input>
                  <button className="basket-place__payment-form__btn">
                    <img src={arrow} alt="404" />
                  </button>
                </div>
                <button
                  className="basket-place__payment-form__submit"
                  onClick={() => {
                    navigate(`/order`);
                  }}
                >
                  Оплатить всё
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="basket-place__clear">
          <div className="basket-place__clear-img">
            <img src={shop} alt="404" />
          </div>
          <h2 className="basket-place__clear-main_txt">Корзина пуста</h2>
          <span className="basket-place__clear-txt">
            Но не поздно это исправить
          </span>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="basket-place__clear-btn"
          >
            Перейти к покупкам
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Basket;
