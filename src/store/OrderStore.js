import { makeAutoObservable } from "mobx";
import { createOrder, fetchOrders } from "../http/orderAPI";

export default class OrderStore {
  constructor() {
    this._orders = [];
    makeAutoObservable(this);
  }

  async createOrder(order) {
    try {
      const createdOrder = await createOrder(order);
      return createdOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  async fetchOrders() {
    try {
      const orders = await fetchOrders();
      this.setOrders(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  setOrders(orders) {
    this._orders = orders;
  }

  get orders() {
    return this._orders;
  }
}
