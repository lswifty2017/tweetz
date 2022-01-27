import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/get-started" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
