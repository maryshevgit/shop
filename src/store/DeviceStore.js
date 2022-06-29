import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._basketItems = {}
        this._selectedType = 1
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        this._basketItems = false
        this._del = ''
        this._oneDevice = []
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setBasketItems(basketItems) {
        this._basketItems = basketItems
    }
    setDel(del) {
        this._del = del
    }
    setOneDevice(oneDevice) {
        this._oneDevice = oneDevice
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get basketItems() {
        return this._basketItems
    }
    get del() {
        return this._del
    }
    get oneDevice() {
        return this._oneDevice
    }
}