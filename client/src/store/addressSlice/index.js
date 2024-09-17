import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "/dashboard/addAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/address`,
        formData
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchAllAddress = createAsyncThunk(
  "/dashboard/fetchAddress",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/address/${userId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "/dashboard/updateAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/dashboard/address/${userId}/${addressId}`,
        formData
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/dashboard/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/address/${userId}/${addressId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
