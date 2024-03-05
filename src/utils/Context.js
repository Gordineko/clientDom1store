import { useEffect } from "react";
import { createContext, useState } from "react";
import UserStore from "../store/UserStore";
import DeviceStore from "../store/DeviceStore";
import OrderStore from "../store/OrderStore";

export const CustomContext = createContext();
const devices = new DeviceStore();
const users = new UserStore();
const orders = new OrderStore();
export const Context = (props) => {
  // const [user, setUser] = useState({ email: "" });
  const [search, setSearch] = useState([]);
  const [basket, setBasket] = useState([]);
  const [favored, setFavored] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    let totalCount = 0;
    basket.map((item) => {
      totalCount += item.count;
    });
    setCount(totalCount);
  }, [basket]);

  useEffect(() => {
    if (localStorage.getItem("likes") != null) {
      setFavored(JSON.parse(localStorage.getItem("likes")));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("baskets") != null) {
      setBasket(JSON.parse(localStorage.getItem("baskets")));
    }
  }, []);

  const value = {
    users,
    devices,
    orders,
    search,
    setSearch,
    basket,
    setBasket,
    favored,
    setFavored,
    count,
    setCount,
  };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};
