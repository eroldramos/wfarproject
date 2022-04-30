import { createSlice } from "@reduxjs/toolkit";

export const authLoginReducer = createSlice({
  name: "login",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.userInfo = action.payload.userInfo;
      state.error = null;
    },
    loginFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    logout(state, action) {
      state.userInfo = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const authLoginActions = authLoginReducer.actions;

export const authRegisterReducer = createSlice({
  name: "register",
  initialState: {
    success: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    registerRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    registerFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    logout(state, action) {
      state.success = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const authRegisterActions = authRegisterReducer.actions;
