export const ADMIN_ROUTE = '/admin'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'
export const SHOP_ROUTE = '/shop'
export const FAVORITE_ROUTE = '/favorite'
export const ONEDEVICE_ROUTE = '/one-device'

export const calcTotalPrice = (items) => items.reduce((acc, item) => Number(item.price) + acc, 0);

