import { configureStore } from "@reduxjs/toolkit";
import { authLoginReducer, authRegisterReducer } from "./authReducers";
import {
  getPendingAccountsReducer,
  acceptAccountsReducer,
} from "./pendingAccountsReducers";
import {
  createSemReducer,
  getSemsReducer,
  getSemDetailsReducer,
  updateSemReducer,
} from "./manageSemReducers";

import {
  getFacultiesReducer,
  changeUserTypeReducer,
  getAreaChairsReducer,
  getDepartmentHeadsReducer,
  getUnassignedFacultiesReducer,
  getAssignedFacultiesReducer,
  unassignedFacultyReducer,
  assignedFacultyReducer,
} from "./manageFacultiesReducers";

//for demo
import { getAllSemsReducer, addSemReducer } from "./sampleReducers";

console.log("HelloWorld");

const store = configureStore({
  reducer: {
    login: authLoginReducer.reducer,
    register: authRegisterReducer.reducer,
    getPendingAccounts: getPendingAccountsReducer.reducer,
    acceptAccounts: acceptAccountsReducer.reducer,
    createSem: createSemReducer.reducer,
    getSems: getSemsReducer.reducer,
    getSemDetails: getSemDetailsReducer.reducer,
    updateSem: updateSemReducer.reducer,
    getFaculties: getFacultiesReducer.reducer,
    getAreaChairs: getAreaChairsReducer.reducer,
    getDepartmentHeads: getDepartmentHeadsReducer.reducer,
    getUnassignedFaculties: getUnassignedFacultiesReducer.reducer,
    getAssignedFaculties: getAssignedFacultiesReducer.reducer,
    changeUserType: changeUserTypeReducer.reducer,
    unassignedFaculty: unassignedFacultyReducer.reducer,
    assignedFaculty: assignedFacultyReducer.reducer,
    // For Demo purpose only

    getAllSems: getAllSemsReducer.reducer,

    addSem: addSemReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
