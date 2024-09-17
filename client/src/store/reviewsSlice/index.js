import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
  isLoading:false,
  reviewsList:[]
}

export const addReviews = createAsyncThunk("/dashboard/addReviews",
  async(formData,{rejectWithValue})=>{
    console.log(formData)
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/reviews/addReview`,
        formData
      );

      return response?.data;
    }catch(error){
      return rejectWithValue(error?.response?.data);
    }
  }
)

export const fetchReviews = createAsyncThunk(
  "/dashboard/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/reviews/fetch/${productId}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const reviewsSlice = createSlice({
  name:"reviews",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewsList=action.payload.data
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviewsList =[];
      });
  }
})


export default reviewsSlice.reducer