import React, { useContext, useEffect, useState } from "react";
import list from "../../image/icone/list.png";
import list_black from "../../image/icone/menu_black.png";
import "./style/choice.css";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { CustomContext } from "../../../utils/Context";
import { fetchTypes } from "../../../http/deviceAPI";

const Сhoice = observer(() => {
  const type = useParams();
  const [activeButtonIndex, setActiveButtonIndex] = useState(5);
  const navigate = useNavigate();

  const { devices } = useContext(CustomContext);

  useEffect(() => {
    switch (type) {
      case "phones":
        setActiveButtonIndex(1);
        break;
      case "laptops":
        setActiveButtonIndex(2);
        break;
      case "tablets":
        setActiveButtonIndex(3);
        break;
      case "homes":
        setActiveButtonIndex(4);
        break;
      default:
        setActiveButtonIndex(5);
        break;
    }
  }, [type, activeButtonIndex]);

  const handleButtonClick = (buttonIndex, nav) => {
    setActiveButtonIndex(buttonIndex);
    navigate(nav);
  };

  return (
    <section className="choice-menu">
      <div className=" container choice">
        <div
          className={
            activeButtonIndex === 5 ? "choice__all active" : "choice__all"
          }
          onClick={() => {
            localStorage.removeItem("selectedType");
            handleButtonClick(5, "/");
          }}
        >
          <img src={activeButtonIndex === 5 ? list : list_black} alt="404" />
          <span>Все товары</span>
        </div>
        <ul className="choice__nav">
          {devices.types.map(
            (el) =>
              el.id < 5 && (
                <li
                  key={el.id}
                  className={
                    el.id === devices.selectedType.id
                      ? "choice__nav-item active"
                      : "choice__nav-item"
                  }
                  onClick={() => {
                    devices.setSelectedType(el);
                    handleButtonClick(el.id, `/products/${el.link}`);
                  }}
                >
                  {el.name}
                </li>
              )
          )}
        </ul>
      </div>
    </section>
  );
});

export default Сhoice;
