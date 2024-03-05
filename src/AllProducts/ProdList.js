import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../MainLanding/pages/Header";
import "./css/products.css";
import Renge from "./components/Reng";
import Footer from "../MainLanding/pages/Footer";
import ProductItem from "./components/ProductItem";
import Sort from "./components/Sort";
import { CustomContext } from "../utils/Context";
import { fetchDevices, fetchTypes } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import Loader from "../MainLanding/Loader";

const Prod = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const { type } = useParams();
  const [values, setValues] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState(null);
  const [activeSort, setActiveSort] = useState(false);
  const { devices } = useContext(CustomContext);
  const pages = Math.ceil(devices.totalCount / 6);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    fetchTypes().then((data) => devices.setTypes(data));
  }, []);

  useEffect(() => {
    fetchDevices(
      devices.selectedType.id,
      devices.selectedBrand.id,
      devices.page,
      6,
      sortBy
    ).then((data) => {
      console.log(data);
      devices.setDevices(data.rows);
      devices.setTotalCount(data.count);
      devices.setLimit(data.limit);
    });
  }, [devices.page, devices.selectedType, sortBy]);

  const SortOpen = () => {
    setActiveSort(!activeSort);
  };
  const setNewPage = (page) => {
    if (devices.page != page) {
      devices.setPage(page);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {activeSort && <div className="overlay" onClick={SortOpen}></div>}

          <Header />
          <div className="container products_pad ">
            <div className={activeSort ? "active-sort " : "products__sort"}>
              <div className="products_pad-prew">
                <h1>{type}</h1>
                <button
                  className={
                    activeSort
                      ? "products_pad-prew_btn"
                      : "products_pad-prew_btn close "
                  }
                  onClick={SortOpen}
                >
                  x
                </button>
              </div>

              <Renge values={values} setValues={setValues} />
              <Sort
                priceAscending={() => {
                  setSortBy("priceAscending");
                }}
                priceDescending={() => {
                  setSortBy("priceDescending");
                }}
              />
            </div>
            <div className="products__catalog">
              <div className="products__sorting">
                <button className="products__sorting-btn" onClick={SortOpen}>
                  Отсортировать
                </button>
              </div>
              <ul className="products">
                {devices.devices.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </ul>
              <div className="products__switch">
                {[...Array(pages)].map((_, index) => (
                  <button
                    key={index + 1}
                    id={index + 1}
                    className={
                      devices.page == index + 1
                        ? "products__switch__btn active-page"
                        : "products__switch__btn"
                    }
                    onClick={() => setNewPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
});

export default Prod;
