import { Navigate, Outlet } from "react-router-dom";
const role = "user";
const AdminPrivateRoute = () => {
  return role === "admin" ? <Outlet/> : <Navigate to="/dashboard/home" />;
};

export default AdminPrivateRoute;
