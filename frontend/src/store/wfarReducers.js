import { createSlice } from "@reduxjs/toolkit";

export const wfarRetrieveOverviewReducer = createSlice({
    name: "wfarRetrieveOverview",
    initialState: {
        isLoading: true,
        error: null,
        facultiesWithWfars: null,
        pageNo: 0,
        noOfPages: 0,
        firstPage: 0,
        lastPage: 0,
        weekBrackets: null,
        semesterNoOfWeeks: 0, 
        currentWeekNo: 0
    },
    reducers: {
        retrieveRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        retrieveSuccessfully(state, action) {
            state.isLoading = false;
            state.error = null;
            state.facultiesWithWfars = action.payload.facultiesWithWfars;
            state.pageNo = action.payload.pageNo;
            state.noOfPages = action.payload.noOfPages;
            state.firstPage = action.payload.firstPage;
            state.lastPage = action.payload.lastPage;
            state.weekBrackets = action.payload.weekBrackets;
            state.semesterNoOfWeeks = action.payload.semesterNoOfWeeks;
            state.currentWeekNo = action.payload.currentWeekNo;
        },
        retrieveFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});


export const wfarPrintOverviewReducer = createSlice({
    name: "wfarPrintOverviewReducer",
    initialState: {
        isLoading: true,
        error: null
    },
    reducers: {
        sendRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        printSuccessfully(state, action) {
            state.isLoading = false;
            state.error = null;
        },
        requestFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});


export const wfarRetrieveOverviewActions = wfarRetrieveOverviewReducer.actions;
export const wfarPrintOverviewActions = wfarPrintOverviewReducer.actions;