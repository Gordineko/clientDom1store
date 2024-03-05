import React, { useContext, useEffect, useState } from "react";
import "../style/header.css";

import Content from "./headerComponents/Content";
import Choice from "./headerComponents/Сhoice";
import Preview from "./headerComponents/Preview";
import Burger from "./headerComponents/Burger";
import { fetchTypes } from "../../http/deviceAPI";
import { CustomContext } from "../../utils/Context";
function Header() {
  const { devices } = useContext(CustomContext);
  const [AuthActive, setAuthActive] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // useEffect(() => {
  //   fetchTypes().then((data) => devices.setTypes(data));
  // }, [devices]);

  function openAuth() {
    setAuthActive(!AuthActive);
  }
  function openMobileAuth() {
    console.log("auth");
    setAuthActive(!AuthActive);
    setIsActive(!isActive);
  }

  const toggleClass = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };
  return (
    <header>
      <Burger
        isActive={isActive}
        AuthActive={AuthActive}
        handleClick={toggleClass}
        AuthClick={openMobileAuth}
      />
      {isActive && <div className="overlay"></div>}
      <Preview handleClick={openAuth} AuthActive={AuthActive} />
      <Content handleClick={toggleClass} />
      <Choice />
    </header>
  );
}

export default Header;
