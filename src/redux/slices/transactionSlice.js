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

export const fetchMyTransactions = createAsyncThunk(
  "transaction/my",
  async ({ from, to }, { rejectWithValue }) => {
    try {
      const res = await API.get(
        `/transactions/my?from=${from}&to=${to}`
      );
      return res.data;
    } catch {
      return rejectWithValue("Failed");
    }
  }
);

export const fetchStaffReport = createAsyncThunk(
  "transaction/staffReport",
  async ({ staffId, from, to }, { rejectWithValue }) => {
    try {
      const res = await API.get(
        `/transactions/staff-report?staffId=${staffId}&from=${from}&to=${to}`
      );
      return res.data;
    } catch {
      return rejectWithValue("Failed");
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transaction/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/transactions/${id}`);
      return id;
    } catch {
      return rejectWithValue("Delete failed");
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transaction/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/transactions/${id}`, data);
      return res.data;
    } catch {
      return rejectWithValue("Update failed");
    }
  }
);


const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    loading: false,
    error: null,
    success: false,
    myTransactions: [],
    staffReport: [],
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
      })
      .addCase(fetchMyTransactions.pending, (state) => {
  state.loading = true;
})
.addCase(fetchMyTransactions.fulfilled, (state, action) => {
  state.loading = false;
  state.myTransactions = action.payload;
})
.addCase(fetchMyTransactions.rejected, (state) => {
  state.loading = false;
})
.addCase(fetchStaffReport.pending, (state) => {
  state.loading = true;
})
.addCase(fetchStaffReport.fulfilled, (state, action) => {
  state.loading = false;
  state.staffReport = action.payload;
})
.addCase(fetchStaffReport.rejected, (state) => {
  state.loading = false;
})

.addCase(deleteTransaction.fulfilled, (state, action) => {
  state.staffReport = state.staffReport.filter(
    (t) => t._id !== action.payload
  );
})

.addCase(updateTransaction.fulfilled, (state, action) => {
  const index = state.staffReport.findIndex(
    (t) => t._id === action.payload._id
  );

  if (index !== -1) {
    state.staffReport[index] = action.payload;
  }
});
  },
});

export default transactionSlice.reducer;