import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchBalanceTypes = createAsyncThunk(
  "balance/fetch",
  async () => {
    const res = await API.get("/add-balance");
    return res.data;
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    data: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalanceTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBalanceTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default balanceSlice.reducer;