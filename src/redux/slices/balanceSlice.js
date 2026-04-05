import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// 🔥 STAFF
export const fetchMyBalance = createAsyncThunk(
  "balance/my",
  async ({ from, to }) => {
    const res = await API.get(
      `/balance-tx/my?from=${from}&to=${to}`
    );
    return res.data;
  }
);

export const fetchAllBalance = createAsyncThunk(
  "balance/all",
  async ({ from, to, staffId }) => {
    const res = await API.get(
      `/balance-tx/all?from=${from}&to=${to}&staffId=${staffId || ""}`
    );
    return res.data;
  }
);

// 🔥 DELETE
export const deleteBalance = createAsyncThunk(
  "balance/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/balance-tx/${id}`);
      return id;
    } catch {
      return rejectWithValue("Delete failed");
    }
  }
);

// 🔥 UPDATE
export const updateBalance = createAsyncThunk(
  "balance/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/balance-tx/${id}`, data);
      return res.data;
    } catch {
      return rejectWithValue("Update failed");
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBalance.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchAllBalance.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteBalance.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (x) => x._id !== action.payload
        );
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        const i = state.data.findIndex(
          (x) => x._id === action.payload._id
        );
        if (i !== -1) state.data[i] = action.payload;
      });
  },
});

export default balanceSlice.reducer;
