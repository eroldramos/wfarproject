import { addListener, createSlice } from "@reduxjs/toolkit";

// export const 

export const myWfarCreateReducer = createSlice({
    name: "myWfarCreateReducer",
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


const initialWfarsState = {
    isLoading: false,
    wfars: [],
    error: false,
    pageNo: 1,
    noOfPages: 1,
    firstPage: 1,
    lastPage:1
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
            state.pageNo = action.payload.pageNo;
            state.noOfPages = action.payload.noOfPages;
            state.firstPage = action.payload.firstPage;
            state.lastPage = action.payload.lastPage;
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
    initialState: { newChange: false },
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

/** ENTRY CRUD */

export const myWfarEntryArchiveReducer = createSlice({
    name: "myWfarEntryArchiveReducer",
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

export const myWfarEntryUnarchiveReducer = createSlice({
    name: "myWfarEntryUnarchiveReducer",
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

export const myWfarEntryCreateReducer = createSlice({
    name: "myWfarEntryCreateReducer",
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

export const myWfarEntryUpdateReducer = createSlice({
    name: "myWfarEntryUpdateReducer",
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

export const myWfarFetchEntryReducer = createSlice({
    name: "myWfarFetchEntryReducer",
    initialState: { 
        isLoading: true,
        entry: null,
        error: null },
    reducers: {
        retrieveRequest(state, action) {
            state.isLoading = true;
            state.error = null;
        },
        retrieveSuccessfully(state, action) {
            state.isLoading = false;
            state.error = null;
            state.entry = action.payload.entry;
        },
        retrieveFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});

export const myWfarCreateActions = myWfarCreateReducer.actions;
export const myWfarFetchActions = myWfarFetchReducer.actions;
export const myWfarsArchivedActions = myWfarsArchivedReducer.actions;
export const wfarSemestersActions = wfarSemestersReducer.actions;
export const myWfarSubmissionActions = myWfarSubmissionReducer.actions;
export const myWfarUnsubmissionActions = myWfarUnsubmissionReducer.actions;
export const myWfarSemesterFilterActions = myWfarSemesterFilterReducer.actions;
export const myWfarRefreshActions = myWfarRefreshReducer.actions;
export const myWfarEntryArchiveActions = myWfarEntryArchiveReducer.actions;
export const myWfarEntryUnarchiveActions = myWfarEntryUnarchiveReducer.actions;
export const myWfarEntryCreateActions = myWfarEntryCreateReducer.actions;
export const myWfarEntryUpdateActions = myWfarEntryUpdateReducer.actions;
export const myWfarFetchEntryActions = myWfarFetchEntryReducer.actions;
// export const myWfarEntryCreateActions = myWfarEntryCreateReducer.actions;