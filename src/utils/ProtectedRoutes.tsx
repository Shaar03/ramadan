import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  let user = false;
  if (localStorage.getItem("user")) user = true;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
