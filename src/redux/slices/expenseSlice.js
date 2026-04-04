import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchExpenses = createAsyncThunk(
  "expense/fetch",
  async () => {
    const res = await API.get("/expenses");
    return res.data;
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    data: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default expenseSlice.reducer;