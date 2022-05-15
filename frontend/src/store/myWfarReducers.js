import { addListener, createSlice } from "@reduxjs/toolkit";

// export const 

const initialWfarsState = {
    isLoading: false,
    wfars: [],
    error: false
}

export const myWfarFetchReducer = createSlice({
    name: "myWfarFetchReducer",
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

export const myWfarSemesterFilterReducer = createSlice({
    name: "myWfarSemesterFilterReducer",
    initialState: { semester_id: 1 },
    reducers: {
        changeSemesterFilter(state, action) {
            state.semester_id = action.payload.id;
        }
    }
})

export const myWfarRefreshReducer = createSlice({
    name: "myWfarRefreshReducer",
    initialState: {newChange: false},
    reducers: {
        alertNewChange(state) {
            state.newChange = true;
        },
        resetNewChange(state) {
            state.newChange = false;
        }
    }
})

const initialSubmissionState = {
    "isLoading": false,
    error: false
}

export const myWfarSubmissionReducer = createSlice({
    name: "myWfarSubmissionReducer",
    initialState: initialSubmissionState,
    reducers: {
        sendRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        requestSuccessfullyCompleted(state, action) {
            state.isLoading = false;
            state.error = null;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});

const initialUnsubmissionState = {
    "isLoading": false,
    error: false
}

export const myWfarUnsubmissionReducer = createSlice({
    name: "myWfarUnsubmissionReducer",
    initialState: initialUnsubmissionState,
    reducers: {
        sendRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        requestSuccessfullyCompleted(state, action) {
            state.isLoading = false;
            state.error = null;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});


export const myWfarArchiveReducer = createSlice({
    name: "myWfarArchiveReducer",
    initialState: {
        isLoading: false,
        error: null
    },
    reducers: {
        sendRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        requestSuccessfullyCompleted(state, action) {
            state.isLoading = false;
            state.error = null;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});

export const myWfarFetchActions = myWfarFetchReducer.actions;
export const myWfarsArchivedActions = myWfarsArchivedReducer.actions;
export const wfarSemestersActions = wfarSemestersReducer.actions;
export const myWfarSubmissionActions = myWfarSubmissionReducer.actions;
export const myWfarUnsubmissionActions = myWfarUnsubmissionReducer.actions;
export const myWfarSemesterFilterActions = myWfarSemesterFilterReducer.actions;
export const myWfarRefreshActions = myWfarRefreshReducer.actions;