import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const PrivateRoutes = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userAuth = useContext(AuthContext);

  console.log("userAuth", userAuth);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/get-started" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
