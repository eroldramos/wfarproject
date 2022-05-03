import { createSlice } from "@reduxjs/toolkit";

export const getPendingAccountsReducer = createSlice({
  name: "getPendingAccount",
  initialState: {
    isLoading: false,
    error: null,
    pendingAccounts: {},
  },
  reducers: {
    pendingAccountRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    pendingAccountSuccess(state, action) {
      state.isLoading = false;
      state.pendingAccounts = action.payload.pendingAccounts;
      state.error = null;
    },
    pendingAccountFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const getPendingAccountsActions = getPendingAccountsReducer.actions;

export const acceptAccountsReducer = createSlice({
  name: "getPendingAccount",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    acceptAccountRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    acceptAccountSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    acceptAccountFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    acceptAccountReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const acceptAccountsActions = acceptAccountsReducer.actions;
