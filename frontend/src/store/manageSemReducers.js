import { createSlice } from "@reduxjs/toolkit";

export const createSemReducer = createSlice({
  name: "createSem",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    createSemRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    createSemSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    createSemFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    createSemReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const createSemActions = createSemReducer.actions;

export const getSemsReducer = createSlice({
  name: "getSems",
  initialState: {
    isLoading: false,
    error: null,
    semesters: [],
  },
  reducers: {
    getSemsRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getSemsSuccess(state, action) {
      state.isLoading = false;
      state.semesters = action.payload.semesters;
      state.error = null;
    },
    getSemsFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    getSemsReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.semesters = [];
    },
  },
});

export const getSemsActions = getSemsReducer.actions;

export const getSemDetailsReducer = createSlice({
  name: "getSemDetails",
  initialState: {
    isLoading: false,
    error: null,
    semDetails: null,
  },
  reducers: {
    getSemDetailsRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getSemDetailsSuccess(state, action) {
      state.isLoading = false;
      state.semDetails = action.payload.semDetails;
      state.error = null;
    },
    getSemDetailsFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    getSemDetailsReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.semDetails = null;
    },
  },
});

export const getSemDetailsActions = getSemDetailsReducer.actions;

export const updateSemReducer = createSlice({
  name: "updateSem",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    updateSemRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    updateSemSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    updateSemFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    updateSemReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const updateSemActions = updateSemReducer.actions;
