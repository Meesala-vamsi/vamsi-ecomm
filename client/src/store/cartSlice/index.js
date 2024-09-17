import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  cartList: null,
};

export const fetchAllCartItems = createAsyncThunk(
  "/dashboard/fetchAllCartItems",
  async ({ id }, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/cart/${id}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const createCartItem = createAsyncThunk(
  "/dashboard/createCartItem",
  async ({productId,userId,quantity}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/cart`,
        { productId, userId, quantity }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const updateCartItem = createAsyncThunk(
  "/dashboard/updateCartItem",
  async ({ productId, userId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/dashboard/cart/update-cart`,
        { productId, userId, quantity }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const deleteCartItem = createAsyncThunk(
  "/dashboard/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/cart/${userId}/${productId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCartItems.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.isLoading = false;
        state.cartList = action.payload.data;
      })
      .addCase(fetchAllCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartList = null;
      })
      .addCase(createCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartList = action.payload.data;
      })
      .addCase(createCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartList = null;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.isLoading = false;
        state.cartList = action.payload.data;
      })
      .addCase(updateCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartList = null;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.isLoading = false;
        state.cartList = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartList = null;
      });
  },
});

export default cartSlice.reducer;
