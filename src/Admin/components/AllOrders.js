import React, { useContext, useEffect, useState } from "react";
import { CustomContext } from "../../utils/Context";
import "./styles/orders.css";
import { fetchOrders } from "../../http/orderAPI";
import open_title from "../../MainLanding/image/icone/open_all.png";
import order_arrow from "../../MainLanding/image/icone/order_arrow.png";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [openMenu, setOpenMenu] = useState(0);
  const { users } = useContext(CustomContext);
  useEffect(() => {
    fetchOrders().then((data) => {
      console.log(data);
      setOrders(data);
    });
  }, []);

  const OpenOrderClick = (orderId) => {
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === orderId ? null : orderId));
  };

  return (
    <div>
      <div className="orders">
        <h2>Заказы</h2>
        <ul className="orders__list-titles">
          <li className="list-titles__item">Имя</li>
          <li className="list-titles__item">Фамилия</li>
          <li className="list-titles__item">Номер телефона</li>
          <li className="list-titles__item">Дата создания</li>
          <li className="list-titles__item">Статус</li>
          <li className="list-titles__item">Сумма заказа</li>
          <li className="list-titles__item">Адресс доставки</li>
        </ul>
        <ul className="orders__list-orders">
          {orders.map((order) => (
            <li className="list-orders__item" key={order.id}>
              <div
                className="item__prev"
                onClick={() => {
                  OpenOrderClick(order.id);
                }}
              >
                <span>{order.name}</span>
                <span>{order.surname}</span>
                <span>{order.phoneNumber}</span>
                <span>{order.createdAt}</span>
                <span>{order.cost}</span>
                <span>{order.cost}</span>
                <span>{order.delivery}</span>
              </div>
              <div
                className={
                  openMenu === order.id ? "item__info open" : "item__info close"
                }
              >
                <h3>Заказанные продукты</h3>
                <ul className="order__prod__list-title">
                  <li className="order__prod__item-title">
                    <span>Название товара</span>
                  </li>
                  <li className="order__prod__item-title">
                    <span>Количество </span>
                  </li>
                </ul>
                <ul className="order__prod__list">
                  {order.devices.map((device) => (
                    <li key={device.id} className="order__prod__item">
                      <span>{device.name}</span> 
                      <span>{device.count}</span>
                      
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllOrders;
