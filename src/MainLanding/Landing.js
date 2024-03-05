import React, { useContext, useEffect, useState } from "react";
import Header from "./pages/Header";
import "./landing.css";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import Loader from "./Loader";
import { CustomContext } from "../utils/Context";
import {
  fetchActualDevices,
  fetchDevices,
  fetchTypes,
} from "../http/deviceAPI";
function Landing() {
  const [isLoading, setIsLoading] = useState(true);
  const [a, seta] = useState(true);
  const { devices } = useContext(CustomContext);
  useEffect(() => {
    fetchTypes().then((data) => devices.setTypes(data));
    fetchActualDevices(1, 6).then((data) => {
      devices.setDevices(data.rows);
      devices.setTotalCount(data.count);
      seta(data);
    });
  }, [devices.page, devices.selectedType, devices.selectedBrand]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <Header />
          <Main />
          <Footer />
        </>
      )}
    </>
  );
}

export default Landing;
