import { createSlice } from "@reduxjs/toolkit";

export const getFacultiesReducer = createSlice({
  name: "getFaculties",
  initialState: {
    isLoading: false,
    error: null,
    faculties: null,
  },
  reducers: {
    getFacultiesRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getFacultiesSuccess(state, action) {
      state.isLoading = false;
      state.faculties = action.payload.faculties;
      state.error = null;
    },
    getFacultiesFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const getFacultiesActions = getFacultiesReducer.actions;

export const getAreaChairsReducer = createSlice({
  name: "getAreaChairs",
  initialState: {
    isLoading: false,
    error: null,
    areachairs: null,
  },
  reducers: {
    getAreaChairsRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getAreaChairsSuccess(state, action) {
      state.isLoading = false;
      state.areachairs = action.payload.areachairs;
      state.error = null;
    },
    getAreaChairsFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const getAreaChairsActions = getAreaChairsReducer.actions;

export const getDepartmentHeadsReducer = createSlice({
  name: "getDepartmentHeads",
  initialState: {
    isLoading: false,
    error: null,
    departmentheads: null,
  },
  reducers: {
    getDepartmentHeadsRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getDepartmentHeadsSuccess(state, action) {
      state.isLoading = false;
      state.departmentheads = action.payload.departmentheads;
      state.error = null;
    },
    getDepartmentHeadsFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const getDepartmentHeadsActions = getDepartmentHeadsReducer.actions;

export const getUnassignedFacultiesReducer = createSlice({
  name: "getUnassignedFaculties",
  initialState: {
    isLoading: false,
    error: null,
    unassignedFaculties: null,
  },
  reducers: {
    getUnassignedFacultiesRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getUnassignedFacultiesSuccess(state, action) {
      state.isLoading = false;
      state.unassignedFaculties = action.payload.unassignedFaculties;
      state.error = null;
    },
    getUnassignedFacultiesFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const getUnassignedFacultiesActions =
  getUnassignedFacultiesReducer.actions;

export const getAssignedFacultiesReducer = createSlice({
  name: "getAssignedFaculties",
  initialState: {
    isLoading: false,
    error: null,
    assignedFaculties: null,
  },
  reducers: {
    getAssignedFacultiesRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getAssignedFacultiesSuccess(state, action) {
      state.isLoading = false;
      state.assignedFaculties = action.payload.assignedFaculties;
      state.error = null;
    },
    getAssignedFacultiesFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const getAssignedFacultiesActions = getAssignedFacultiesReducer.actions;

export const changeUserTypeReducer = createSlice({
  name: "changeUserType",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    changeUserTypeRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    changeUserTypeSuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    changeUserTypeFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    changeUserTypeReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const changeUserTypeActions = changeUserTypeReducer.actions;

export const unassignedFacultyReducer = createSlice({
  name: "unassignedFaculty",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    unassignedFacultyRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    unassignedFacultySuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    unassignedFacultyFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    unassignedFacultyReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const unassignedFacultyActions = unassignedFacultyReducer.actions;

export const assignedFacultyReducer = createSlice({
  name: "assignedFaculty",
  initialState: {
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    assignedFacultyRequest(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    assignedFacultySuccess(state, action) {
      state.isLoading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    assignedFacultyFail(state, action) {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    assignedFacultyReset(state, action) {
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const assignedFacultyActions = assignedFacultyReducer.actions;
