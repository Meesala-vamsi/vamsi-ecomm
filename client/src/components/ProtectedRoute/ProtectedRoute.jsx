import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ isAuthenticated,user,children }) => {

  const location = useLocation()

  if(location.pathname === "/"){
    if(!isAuthenticated){
      return <Navigate to="/auth/login" />;
    }else{
      if (user?.role === "admin") {
        return <Navigate to="/admin/dash" />;
      } else {
        return <Navigate to="/dashboard/home" />;
      }
    }
  }
  if(!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))){
    return <Navigate to="/auth/login"/>
  }

  if(isAuthenticated && (location.pathname.includes("login") || location.pathname.includes("register"))){
    if(user?.role === "admin"){
      return <Navigate to="/admin/dash"/>
    }else{
      return <Navigate to="/dashboard/home"/>
    }
  }

  if(isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")){
    return <Navigate to="/dashboard/home" />
  }

  if(isAuthenticated && user?.role === "admin" && location.pathname.includes("dashboard")){
    return <Navigate to="/admin/dash" />
  }

  return <>{children}</>

};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user :PropTypes.object.isRequired
};

export default ProtectedRoute;
