import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index"
import productReducer from "./productSlice/index"
import dashboardReducer from "./dashboardSlice/index"
import cartSlice from "./cartSlice";
import addressSlice from "./addressSlice";
import orderSlice from "./orderSlice";
import adminOrderSlice from "./adminOrderSlice";
import reviewsSlice from "./reviewsSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    //admin
    adminProducts: productReducer,
    adminOrders: adminOrderSlice,
    //dashboard
    dashboardProducts: dashboardReducer,
    cartProducts: cartSlice,
    address: addressSlice,
    orders: orderSlice,
    reviews: reviewsSlice,
  },
});