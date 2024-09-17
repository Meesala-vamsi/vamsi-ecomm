import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  url: `${import.meta.env.VITE_API_URL}`,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      // Reject with the server error message
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkAuth",
  async ( rejectWithValue) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/auth-check`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store,no-cache,must-revalidate,proxy-revalidate",
          },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      // Reject with the server error message
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (rejectWithValue) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserStatus: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(registerUser.rejected, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.data),
          (state.isAuthenticated = true);
      })
      .addCase(loginUser.rejected, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.user),
          (state.isAuthenticated = true);
      })
      .addCase(checkAuth.rejected, (state) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
      });
  },
});

export const { setUserStatus } = authSlice.actions;

export default authSlice.reducer;
