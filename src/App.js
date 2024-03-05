import { Route, Routes } from "react-router-dom";
import Landing from "./MainLanding/Landing";
import Prod from "./AllProducts/ProdList";
import Product from "./Product/Product";
import PersonalArea from "./PersonalArea/PersonalArea";
import Orders from "./PersonalArea/components/Orders";
import Desired from "./PersonalArea/components/Desired";
import Stock from "./PersonalArea/components/Stock";
import Sms from "./PersonalArea/components/Sms";
import Profile from "./PersonalArea/components/Profile";
import ProdListSerch from "./AllProducts/ProdListSerch";
import Like from "./ToolsPages/pages/Like";
import Basket from "./ToolsPages/pages/Basket";
import Admin from "./Admin/Admin";
import AppRouter from "./Routes/AppRouter";
import { observer } from "mobx-react-lite";
import { CustomContext } from "./utils/Context";
import { useContext, useEffect, useState } from "react";
import { check } from "./http/userAPI";
import Loader from "./MainLanding/Loader";
import { fetchDevices, fetchTypes } from "./http/deviceAPI";

const App = observer(() => {
  const { users, devices } = useContext(CustomContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // fetchTypes().then((data) => devices.setTypes(data));
      check()
        .then((data) => {
          users.setUser(true);
          users.setIsAuth(true);
          users.setRole(data.role);
        })
        .finally(() => setLoading(false));
    }, 500);
  }, [users]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <AppRouter />
    </>
  );
});

export default App;
