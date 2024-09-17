import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
  isLoading:false,
  allOrdersList : [],
  allOrderDetails : null
}

export const getAllOrdersByUser = createAsyncThunk(
  "/admin/getAllOrdersByUser",
  async (rejectWithValue) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllOrderDetails = createAsyncThunk(
  "/admin/getAllOrderDetails",
  async (id,{ rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders/details/${id}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/admin/updateOrderStatus",
  async ({id,orderStatus}, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/orders/update/${id}`,{orderStatus}
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allOrdersList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.allOrdersList = [];
      })
      .addCase(getAllOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allOrderDetails = action.payload.data;
      })
      .addCase(getAllOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.allOrderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrdersSlice.reducer;
export default adminOrdersSlice.reducer;

