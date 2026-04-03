import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const addTransaction = createAsyncThunk(
  "transaction/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/transactions", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add transaction"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addTransaction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;