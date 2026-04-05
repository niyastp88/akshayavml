import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// 🔥 STAFF
export const fetchMyExpenses = createAsyncThunk(
  "expense/my",
  async ({ from, to }) => {
    const res = await API.get(
      `/expenses/my?from=${from}&to=${to}`
    );
    return res.data;
  }
);

export const fetchAllExpenses = createAsyncThunk(
  "expense/all",
  async ({ from, to, staffId }) => {
    const res = await API.get(
      `/expenses/all?from=${from}&to=${to}&staffId=${staffId || ""}`
    );
    return res.data;
  }
);

// 🔥 DELETE
export const deleteExpense = createAsyncThunk(
  "expense/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/expenses/${id}`);
      return id;
    } catch {
      return rejectWithValue("Delete failed");
    }
  }
);

// 🔥 UPDATE
export const updateExpense = createAsyncThunk(
  "expense/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/expenses/${id}`, data);
      return res.data;
    } catch {
      return rejectWithValue("Update failed");
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyExpenses.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchAllExpenses.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (x) => x._id !== action.payload
        );
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const i = state.data.findIndex(
          (x) => x._id === action.payload._id
        );
        if (i !== -1) state.data[i] = action.payload;
      });
  },
});

export default expenseSlice.reducer;