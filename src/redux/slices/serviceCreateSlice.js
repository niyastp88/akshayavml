import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const createService = createAsyncThunk(
  "service/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/services", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create service");
    }
  }
);

const serviceCreateSlice = createSlice({
  name: "serviceCreate",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetServiceState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createService.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetServiceState } = serviceCreateSlice.actions;
export default serviceCreateSlice.reducer;