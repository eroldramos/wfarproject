import { createSlice } from "@reduxjs/toolkit";

export const getNotificationReducer = createSlice({
    name: "getNotificationReducer",
    initialState: {
        isLoading: false,
        error: null,
        notifications: [],
    },
    reducers: {
        getNotificationRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        getNotificationSuccess(state, action) {
            state.isLoading = false;
            state.notifications = action.payload.notifications;
            state.error = null;
        },
        getNotificationFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        },
    },
});

export const getNotificationAction = getNotificationReducer.actions