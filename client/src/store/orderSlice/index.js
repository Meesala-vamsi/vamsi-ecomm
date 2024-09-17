import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  successUrl: null,
  ordersList: [],
  orderDetails: null,
};

export const createOrder = createAsyncThunk(
  "/dashboard/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/order`,
        orderData
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "/dashboard/capturePayment",
  async ({ orderId, paymentId, payerId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/order/capture`,
        { orderId, paymentId, payerId }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllUserOrders = createAsyncThunk(
  "/dashboard/getAllUserOrders",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/order/list/${userId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "/dashboard/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/order/details/${id}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderDetails:(state)=>{
      state.orderDetails=null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        state.successUrl = action.payload.successUrl;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
        state.successUrl = null;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersList = action.payload.data;
      })
      .addCase(getAllUserOrders.rejected, (state) => {
        state.isLoading = false;
        state.ordersList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const {resetOrderDetails} = orderSlice.actions;
export default orderSlice.reducer;
