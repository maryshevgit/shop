import Admin from "./pages/Admin/Admin";
import Auth from "./pages/Auth/Auth";
import Favorite from "./pages/Favorite/Favorite";
import OneDevice from "./pages/OneDevice/OneDevice";
import Shop from "./pages/Shop/Shop";
import { ADMIN_ROUTE, FAVORITE_ROUTE, LOGIN_ROUTE, ONEDEVICE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE, 
        element: <Admin />
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE, 
        element: <Auth />
    },
    {
        path: REGISTRATION_ROUTE, 
        element: <Auth />
    },
    {
        path: SHOP_ROUTE,
        element: <Shop />
    },
    {
        path: FAVORITE_ROUTE,
        element: <Favorite />
    },
    {
        path: ONEDEVICE_ROUTE,
        element: <OneDevice />
    },
]