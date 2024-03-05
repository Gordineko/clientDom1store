import React, { useContext, useEffect, useState } from "react";
import "./product.css";
import Footer from "../MainLanding/pages/Footer";
import Header from "../MainLanding/pages/Header";
import { useFetcher, useParams } from "react-router-dom";
import Presentation from "./components/Presentation";
import Loader from "../MainLanding/Loader";
import { fetchOneDevice, fetchTypes } from "../http/deviceAPI";
import { CustomContext } from "../utils/Context";

function Product() {
  const { name, id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { devices } = useContext(CustomContext);
  const [device, setDevice] = useState({ info: [] });
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
    // fetchTypes().then((data) => devices.setTypes(data));
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filteredProducts]);

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <Header />
          <Presentation key={device.id} product={device} className="product" />
          <Footer />
        </div>
      )}
    </>
  );
}

export default Product;
