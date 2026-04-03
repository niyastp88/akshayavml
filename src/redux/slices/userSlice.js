import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const createStaff = createAsyncThunk(
  "users/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/users", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create staff");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createStaff.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;