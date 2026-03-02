import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./slices/roles/role-slice"; 

export const store = configureStore({
  reducer: {
    roles: roleReducer,
    // Add other reducers here as you build them (e.g., auth: authReducer)
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;