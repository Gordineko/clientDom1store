import React from "react";
import "./style/advertising.css";
import mac from "../../image/company/mac.png";
import samsung from "../../image/company/samsung.png";
import apple from "../../image/company/apple.png";
import huawei from "../../image/company/huawei.png";
import xiaomi from "../../image/company/xiaomi.png";
function Advertising() {
  return (
    <section className="commercial">
      <div className="advert">
        <div className="advert__content">
          <img src={mac} alt="404" />
          <div className="advert__txt">
            <p className="advert__txt_name">Apple MacBook Air 13.6</p>
            <p className="advert__txt_description">Выгода до 10 000 ua</p>
            <button className="advert__btn">Подробнее</button>
          </div>
        </div>
        <ul className="advert__manufacturer">
          <li>
            <button className="manufacturer_btn">
              <img className="samsung_img" src={samsung} alt="404"></img>
            </button>
          </li>

          <li>
            <button className="manufacturer_btn">
              <img src={apple} alt="404"></img>
            </button>
          </li>

          <li>
            <button className="manufacturer_btn">
              <img src={huawei} alt="404"></img>
            </button>
          </li>

          <li>
            <button className="manufacturer_btn">REDMI</button>
          </li>
          <li>
            <button className="manufacturer_btn">
              <img src={xiaomi} alt="404"></img>
            </button>
          </li>

          <li>
            <button className="manufacturer_btn">HONOR </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Advertising;
