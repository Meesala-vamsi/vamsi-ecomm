import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Auth/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Admin/dashboard";
import Orders from "./pages/Admin/orders";
import Products from "./pages/Admin/products";
import AdminLayout from "./components/Admin/layout";
import DashboardLayout from "./components/Shopping/layout";
import DashProducts from "./pages/Dashboard/products";
import Account from "./pages/Dashboard/account";
import Checkout from "./pages/Dashboard/checkout";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Dashboard/home";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";
import { fetchAllProducts } from "./store/productSlice";
import PaymentSuccessPage from "./pages/Dashboard/paymentSuccess";
import PaymentReturnPage from "./pages/Dashboard/paymentReturn";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    // dispatch(fetchAllProducts())
    // .then((response)=>{
    //   console.log(response)
    // })
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 bottom-1/2 flex items-center justify-center min-h-screen">
        <div className="loader border-t-transparent border-4 border-gray-400 rounded-full w-9 h-9 animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
            </ProtectedRoute>
          }
        />
        <Route
          path="auth/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dash" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="products" element={<DashProducts />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="home" element={<Home />} />
          <Route path="paypal-return" element={<PaymentReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
