import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._searchDevices =
      JSON.parse(localStorage.getItem("searchDevices")) || [];
    this._selectedType = JSON.parse(localStorage.getItem("selectedType")) || {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setSearchDevices(searchDevices) {
    this._searchDevices = searchDevices;
    if (searchDevices) {
      localStorage.setItem("searchDevices", JSON.stringify(searchDevices));
    } else {
      localStorage.removeItem("searchDevices");
    }
  }

  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
    if (type) {
      localStorage.setItem("selectedType", JSON.stringify(type));
    } else {
      localStorage.removeItem("selectedType");
    }
  }
  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setLimit(limit) {
    this._limit = limit;
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get searchDevices() {
    return this._searchDevices;
  }

  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}
