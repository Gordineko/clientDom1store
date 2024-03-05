import Prod from "../AllProducts/ProdList";
import ProdListSerch from "../AllProducts/ProdListSerch";

import Landing from "../MainLanding/Landing";
import PersonalArea from "../PersonalArea/PersonalArea";
import Desired from "../PersonalArea/components/Desired";
import Orders from "../PersonalArea/components/Orders";
import Profile from "../PersonalArea/components/Profile";
import Sms from "../PersonalArea/components/Sms";
import Stock from "../PersonalArea/components/Stock";
import Product from "../Product/Product";
import Basket from "../ToolsPages/pages/Basket";
import Like from "../ToolsPages/pages/Like";
import Admin from "../Admin/Admin";
import {
  ADMIN_ROUT,
  BASKET_ROUT,
  DESIRED_ROUT,
  LIKE_ROUT,
  LOGIN_ROUT,
  ORDERS_ROUT,
  PERSONAL_ROUT,
  PRODUCTS_ROUT,
  PRODUCT_ROUT,
  PRODUCT_SEARCH_ROUT,
  REGISTRATION_ROUT,
  SHOP_ROUT,
  SMS_ROUT,
  STOCK_ROUT,
} from "../utils/consts";
import Order from "../ordering/Order";
import Auth from "../Authoriz/page/Auth";
import Register from "../Authoriz/page/Register";
import AdminAuth from "../Admin/AdminAuth";
import AllOrders from "../Admin/components/AllOrders";
import ProductAdding from "../Admin/components/ProductAdding";
import Customers from "../Admin/components/Customers";

export const authRoutes = [
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "",
        element: <ProductAdding />,
      },
      {
        path: "orders",
        element: <AllOrders />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
    ],
  },
];
export const publicRoutes = [
  {
    path: "/admin",
    element: <AdminAuth />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/registration",
    element: <Register />,
  },
  {
    path: "/products/:type",
    element: <Prod />,
  },
  {
    path: "/:type/:name/:id",
    element: <Product />,
  },
  {
    path: "/personal",
    element: <PersonalArea />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "desired",
        element: <Desired />,
      },
      {
        path: "stock",
        element: <Stock />,
      },
      {
        path: "sms",
        element: <Sms />,
      },
    ],
  },
  {
    path: "/search/:inquiry",
    element: <ProdListSerch />,
  },

  {
    path: "/like",
    element: <Like />,
  },
  {
    path: "/basket",
    element: <Basket />,
  },
  {
    path: "/",
    element: <Landing />,
  },
];
