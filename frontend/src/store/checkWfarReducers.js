import { createSlice } from "@reduxjs/toolkit";

export const getCheckWfarReducer = createSlice({
  name: "getCheckWfar",
  initialState: {
    isLoading: false,
    error: null,
    wfar: {},
  },
  reducers: {
    getCheckWfarRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getCheckWfarSuccess(state, action) {
      state.isLoading = false;
      state.wfar = action.payload.wfar;
      state.error = null;
    },
    getCheckWfarFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});
export const getCheckWfarActions = getCheckWfarReducer.actions;

export const postCommentReducer = createSlice({
  name: "postComment",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    postCommentRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    postCommentSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    postCommentFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    postCommentReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const postCommentActions = postCommentReducer.actions;

export const updateCommentReducer = createSlice({
  name: "updateComment",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    updateCommentRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    updateCommentSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    updateCommentFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    updateCommentReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const updateCommentActions = updateCommentReducer.actions;

export const deleteCommentReducer = createSlice({
  name: "deleteComment",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    deleteCommentRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    deleteCommentFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    deleteCommentReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const deleteCommentActions = deleteCommentReducer.actions;

export const changeCheckStatusReducer = createSlice({
  name: "changeCheckStatus",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    changeCheckStatusRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    changeCheckStatusSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    changeCheckStatusFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    changeCheckStatusReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const changeCheckStatusActions = changeCheckStatusReducer.actions;
