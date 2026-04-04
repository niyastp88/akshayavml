import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/dashboard");
      return res.data;
    } catch {
      return rejectWithValue("Failed");
    }
  }
);

const slice = createSlice({
  name: "dashboard",
  initialState: {
    data: {},
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default slice.reducer;