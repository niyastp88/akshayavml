import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchServices = createAsyncThunk(
  "services/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/services");
      return res.data;
    } catch {
      return rejectWithValue("Failed to load services");
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;