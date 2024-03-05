import React from "react";
import Advertising from "./maneComponents/Advertising";
import Catalog from "./maneComponents/Сatalog";
import SwiperActual from "./maneComponents/SwiperActual";
import Privilege from "./maneComponents/Privilege";
function Main() {
  return (
    <main>
      <Advertising />
      <div className="container">
        <Catalog />
        <SwiperActual />
        <Privilege />
      </div>
    </main>
  );
}

export default Main;
