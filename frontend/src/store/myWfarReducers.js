import { createSlice } from "@reduxjs/toolkit";

// export const 

const initialWfarsState = {
    isLoading: false,
    wfars: [],
    error: false
}

export const myWfarsReducer = createSlice({
    name: "myWfarsReducer",
    initialState: initialWfarsState,
    reducers: {
        retrieveRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        retrieveSuccessfully(state, action) {
            state.isLoading = false;
            state.error = null;
            state.wfars = action.payload.wfars;
        },
        retrieveFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});

const initialArchivedWfarEntriesState = {
    isLoading: false,
    archivedEntries: [],
    error: false
}
export const myWfarsArchivedReducer = createSlice({
    name: "myWfarsArchivedReducer",
    initialState: initialArchivedWfarEntriesState,
    reducers: {
        retrieveRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        retrieveSuccessfully(state, action) {
            state.isLoading = false;
            state.error = null;
            state.archivedEntries = action.payload.archivedEntries;
        },
        retrieveFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});

const initialWfarSemestersState = {
    isLoading: false,
    semesters: [],
    error: false
}
export const wfarSemestersReducer = createSlice({
    name: "wfarSemestersReducer",
    initialState: initialWfarSemestersState,
    reducers: {
        retrieveRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        retrieveSuccessfully(state, action) {
            state.isLoading = false;
            state.error = null;
            state.semesters = action.payload.semesters;
        },
        retrieveFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});


export const myWfarsActions = myWfarsReducer.actions;
export const myWfarsArchivedActions = myWfarsArchivedReducer.actions;
export const wfarSemestersActions = wfarSemestersReducer.actions;