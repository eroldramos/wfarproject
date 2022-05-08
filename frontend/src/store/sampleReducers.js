import { createSlice } from "@reduxjs/toolkit";

export const getAllSemsReducer = createSlice({
  name: "getAllSemsReducer",
  initialState: {
    isLoading: false,
    error: null,
    allSems: null,
  },
  reducers: {
    getSemsRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getSemsSuccess(state, action) {
      state.isLoading = false;
      state.allSems = action.payload.allSems;
      state.error = null;
    },
    getSemsFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const getAllSemsActions = getAllSemsReducer.actions;

export const addSemReducer = createSlice({
  name: "addSemReducer",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    addSemRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    addSemSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    addSemFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const addSemActions = addSemReducer.actions;
