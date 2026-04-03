import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const fetchReport = createAsyncThunk(
  "report/fetch",
  async ({ from, to }, { rejectWithValue }) => {
    try {
      const res = await API.get(`/reports?from=${from}&to=${to}`);
      return res.data; // { data, totals }
    } catch (err) {
      return rejectWithValue("Failed to load report");
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    data: [],
    totals: {},   // 🔥 NEW
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔄 PENDING
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ SUCCESS
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload.data;       // 🔥 IMPORTANT
        state.totals = action.payload.totals;   // 🔥 NEW
      })

      // ❌ ERROR
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reportSlice.reducer;