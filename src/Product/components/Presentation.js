import React, { useContext, useState } from "react";
import "../style/description.css";
import { CustomContext } from "../../utils/Context";
import { Navigate, useNavigate } from "react-router-dom";

function Presentation(props) {
  const { basket, setBasket } = useContext(CustomContext);
  const { product } = props;
  const [mainImage, setMainImage] = useState(product.img);
  const navigate = useNavigate();

  const changeMainImage = (newImage) => {
    setMainImage(newImage);
  };
  const costs = parseFloat(product.price.replace(/[ ,]/g, ""));
  const buyin = Math.round(costs - costs * product.discount);

  function BuyProduct(product, buttonIndex, e) {
    e.stopPropagation();

    if (typeof product === "object" && product !== null) {
      const existingProductIndex = basket.findIndex(
        (basketProduct) => basketProduct.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedBasket = [...basket];
        updatedBasket[existingProductIndex].count += 1;
        setBasket(updatedBasket);
        localStorage.setItem("baskets", JSON.stringify(updatedBasket));
      } else {
        const newProduct = { ...product, count: 1 };
        setBasket([...basket, newProduct]);
        localStorage.setItem(
          "baskets",
          JSON.stringify([...basket, newProduct])
        );
      }
    }
  }
  console.log(product);
  return (
    <section className="product__page">
      <div className="container">
        <div key={product.id} className="product__preview">
          <div className="product_photos">
            <div className="product__photo_group">
              <div
                className="product__photo usual"
                onClick={() => changeMainImage(product.img)}
              >
                <img src={process.env.REACT_APP_API_URL + product.img}></img>
              </div>
              <div
                className="product__photo usual"
                onClick={() => changeMainImage(product.img2)}
              >
                <img src={process.env.REACT_APP_API_URL + product.img2}></img>
              </div>
              <div
                className="product__photo usual"
                onClick={() => changeMainImage(product.img3)}
              >
                <img src={process.env.REACT_APP_API_URL + product.img3}></img>
              </div>
              <div
                className="product__photo usual"
                onClick={() => changeMainImage(product.img4)}
              >
                <img src={process.env.REACT_APP_API_URL + product.img4}></img>
              </div>
            </div>
            <div className="products__photo_preview">
              <img src={process.env.REACT_APP_API_URL + mainImage}></img>
            </div>
          </div>

          <div className="product__title_preview">
            <div className="product__title">
              <h2 className="product__title_name">{product.name}</h2>
              <div className="product__costs">
                <p
                  className={
                    product.discount === "0"
                      ? "product__title_cost without-discount"
                      : "product__title_cost with-discount"
                  }
                >
                  {product.price + " ₴"}
                </p>
                <p className="product__title_cost">
                  {product.discount === 0 ? "" : buyin + " ₴"}
                </p>
              </div>

              <div className="product__btn_group">
                <button
                  className="product__btn basket"
                  onClick={(e) => {
                    if (BuyProduct(product, product.id, e) === false) {
                      e.preventDefault();
                    }
                  }}
                >
                  В корзину
                </button>
              </div>
            </div>
            <div className="product_advert">
              <h3>Выбери сам !!!</h3>
              <span>в подарок при заказе</span>
              <div className="product_advert_btn_group">
                <button className="product__btn basket">Узнать больше</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product__description">
        <div className="container">
          <div className="product__description_title">
            <span>Технические Характеристики</span>
          </div>

          <div className="product__description_info">
            <ul className="description__list">
              {product.info.map((info) => (
                <li key={info.id} className="description__list_item">
                  {info.title}
                </li>
              ))}
            </ul>
            <div className="description_info_data">
              <ul className="description_data__list">
                {product.info.map((info) => (
                  <li key={info.id} className="description_data__list_item">
                    {info.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Presentation;
