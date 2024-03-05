import React, { useContext, useState } from "react";
import "./style/catalog.css";
import phones from "../../image/products/phones.png";
import laptops from "../../image/products/laptops.png";
import tablets from "../../image/products/tablets.png";
import games from "../../image/products/games.png";
import homes from "../../image/products/homes.png";
import consoles from "../../image/products/consoles.png";
import clocks from "../../image/products/clocks.png";
import computers from "../../image/products/computers.png";
import { CustomContext } from "../../../utils/Context";

function Сatalog() {
  const imageMap = {
    phones,
    laptops,
    tablets,
    games,
    homes,
    consoles,
    clocks,
    computers,
  };
  const [isOpen, setIsOpen] = useState(false);
  const { devices } = useContext(CustomContext);
  function handleClick(href, type) {
    devices.setSelectedType(type);
    window.location.href = `${href}`;
  }
  function openCatalog() {
    setIsOpen(!isOpen);
  }

  return (
    <section className="catalog">
      <div className="catalog__title">
        <h2>Каталог товаров</h2>
        <span onClick={openCatalog}>{isOpen ? "Скрыть" : "Показать всё"}</span>
      </div>
      <div className={isOpen ? "catalog__list open" : "catalog__list close"}>
        {devices.types.map((type) => (
          <div
            key={type.id}
            className="catalog__list_item"
            onClick={() => handleClick(`/products/${type.link}`, type)}
          >
            <span>{type.name}</span>
            <div className="catalog__list_item__container-img">
              <img src={imageMap[type.link]} alt="404" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Сatalog;
