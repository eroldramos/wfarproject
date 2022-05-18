import { createSlice } from "@reduxjs/toolkit";

export const getAllWFARinThisWeekReducer = createSlice({
    name: "getAllWFARinThisWeekReducer",
    initialState: {
        isLoading: false,
        error: null,
        wfar: [],
    },
    reducers: {
        getAllWfarThisWeekRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        getAllWfarThisWeekSuccess(state, action) {
            state.isLoading = false;
            state.wfar = action.payload.wfar;
            state.error = null;
        },
        getAllWfarThisWeekFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        },
    },
});

export const getAllWFARinThisWeekAction = getAllWFARinThisWeekReducer.actions

export const getAllUsersReducer = createSlice({
    name: "getAllUsersReducer",
    initialState: {
        isLoading: false,
        error: null,
        users: [],
    },
    reducers: {
        getAllUsersRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        getAllUsersSuccess(state, action) {
            state.isLoading = false;
            state.users = action.payload.users;
            state.error = null;
        },
        getAllUsersFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        },
    },
});

export const getAllUsersAction = getAllUsersReducer.actions

export const getActiveSemReducer = createSlice({
    name: "getActiveSemReducer",
    initialState: {
        isLoading: false,
        error: null,
        activeSem: null,
    },
    reducers: {
        getActiveSemRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        getActiveSemSuccess(state, action) {
            state.isLoading = false;
            state.activeSem = action.payload.activeSem;
            state.error = null;
        },
        getActiveSemFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        },
    },
});

export const getActiveSemAction = getActiveSemReducer.actions