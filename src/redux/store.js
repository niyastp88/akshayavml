import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import serviceReducer from "./slices/serviceSlice";
import transactionReducer from "./slices/transactionSlice";
import reportReducer from "./slices/reportSlice";
import userReducer from "./slices/userSlice";
import serviceCreateReducer from "./slices/serviceCreateSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    transactions: transactionReducer,
    report: reportReducer,
    users: userReducer,
    serviceCreate: serviceCreateReducer,
  },
});