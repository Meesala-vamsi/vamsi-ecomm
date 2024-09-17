import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
  isLoading:true,
  productsList:[]
}

export const addProducts = createAsyncThunk(
  "/admin/addProducts",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/products`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProducts = createAsyncThunk(
  "/admin/updateProducts",
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "/admin/deleteProducts",
  async ({ id, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/products/${id}`
      );

      console.log(response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/admin/fetchAllProducts",
  async (rejectWithValue ) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/products`);
      console.log(response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name:"adminProducts",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productsList = action.payload.data);
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productsList = action.payload.data);
      })
      .addCase(updateProducts.rejected, (state) => {
        state.isLoading = false;
      })
  }
})

// export {} = productSlice.actions
export default productSlice.reducer