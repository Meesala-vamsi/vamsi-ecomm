import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  productsList: [],
  productDetails: null
};

export const getProducts = createAsyncThunk(
  "/dashboard/getProducts",
  async ({sort,category},rejectWithValue) => {
    try {
      
      const filter = new URLSearchParams({
        category,
        sortBy:sort
      })
      let response = null
      if (category !== undefined) {
        response = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/products?${filter}`
        );
      } else {
        response = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/products`
        );
      }

      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "/dashboard/fetchProductById",
  async ({ id, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/products/${id}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "/dashboard/searchProducts",
  async (searchVal, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/products/search?search=${searchVal}`,
        { withCredentials: true }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const dashboardSlice = createSlice({
  name: "dashboardProducts",
  initialState,
  reducers: {
    setProductDetails:(state)=>{
      state.productDetails=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload.data;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = true;
        state.productsList = [];
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productsList = action.payload.data);
      })
      .addCase(searchProducts.rejected, (state, action) => {
        (state.isLoading = false), (state.productsList = action.payload.data);
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.isLoading = true;
        state.productDetails = null;
      });
  },
});

export const {setProductDetails} = dashboardSlice.actions

export default dashboardSlice.reducer;
