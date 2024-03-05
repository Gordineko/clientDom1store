import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import { useNavigate } from "react-router-dom";
import stat from "../../image/icone/statistic.png";
import like from "../../image/icone/like.png";
import ProductItem from "../../../AllProducts/components/ProductItem";
import "./style/swiperActual.css";
import { CustomContext } from "../../../utils/Context";
import { fetchActualDevices } from "../../../http/deviceAPI";

SwiperCore.use([Navigation]);

export default function App() {
  const navigate = useNavigate();
  const [slidesPerView, setSlidesPerView] = useState(4);
  const { devices } = useContext(CustomContext);

  const updateSlidesPerView = () => {
    if (window.innerWidth < 480) {
      setSlidesPerView(1);
    } else if (window.innerWidth < 726) {
      setSlidesPerView(2);
    } else if (window.innerWidth < 1250) {
      setSlidesPerView(3);
    } else {
      setSlidesPerView(4);
    }
  };

  window.addEventListener("resize", updateSlidesPerView);

  return (
    <section className="swiper-container">
      <div className="swiper__title">
        <h2>Актуальные предложения</h2>
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slidesPerView={slidesPerView}
        spaceBetween={50}
        className="mySwiper"
      >
        {devices.devices.map((item) => (
          <SwiperSlide id="slide" key={item.id}>
            <ProductItem product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
