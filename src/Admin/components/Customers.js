import React, { useContext, useEffect, useState } from "react";
import { CustomContext } from "../../utils/Context";
import { getAllUsers } from "../../http/userAPI";
import "./styles/customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const { users } = useContext(CustomContext);
  useEffect(() => {
    getAllUsers().then((data) => {
      setCustomers(data);
    });
  }, []);

  return (
    <div className="customers">
      <h2>Зарегестрированные пользователи</h2>
      <ul className="customers__list-titles">
        <li className="list-titles__item">Имя</li>
        <li className="list-titles__item">Фамилия</li>
        <li className="list-titles__item">Email</li>
        <li className="list-titles__item">Дата создания</li>
      </ul>
      <ul className="customers__list-users">
        {customers.map((customer) => (
          <li className="list-users__item" key={customer.id}>
            <span>{customer.name}</span>
            <span>{customer.surname}</span>
            <span>{customer.email}</span>
            <span>{customer.createdAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;
