import { configureStore } from "@reduxjs/toolkit";
import {
  authLoginReducer,
  authRegisterReducer,
  forgetPasswordReducer,
  resetPasswordReducer,
} from "./authReducers";
import {
  getPendingAccountsReducer,
  acceptAccountsReducer,
} from "./pendingAccountsReducers";
import {
  createSemReducer,
  getSemsReducer,
  getSemDetailsReducer,
  updateSemReducer,
  getArchivedSemsReducer,
  archiveSemReducer,
  restoreSemReducer,
  activateSemReducer,
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

// erika
import {
  myWfarCreateReducer,
  myWfarFetchReducer,
  myWfarsArchivedReducer,
  wfarSemestersReducer,
  myWfarSubmissionReducer,
  myWfarUnsubmissionReducer,
  myWfarSemesterFilterReducer,
  myWfarRefreshReducer,
  myWfarEntryArchiveReducer,
  myWfarEntryUnarchiveReducer,
  myWfarEntryCreateReducer,
  myWfarEntryUpdateReducer,
  myWfarFetchEntryReducer,
} from "./myWfarReducers";

import {
  wfarPrintOverviewReducer,
  wfarRetrieveOverviewReducer,
  wfarActiveSemesterReducer,
  wfarPrintIndividualReducer,
  wfarSelectedSemesterReducer,
  weeklyWfarRetrieveReducer,
  weeklyWfarPrintReducer
} from "./wfarReducers";

// sheen
import {
  getAllWFARinThisWeekReducer,
  getAllUsersReducer,
  getActiveSemReducer,
  getWFARwholeSemReducer,
  getWFARCommentsReducer,
} from "./dashboardReducer";

import {
  getNotificationReducer,
}from "./notificationReducer";

// erold
import {
  getCheckWfarReducer,
  postCommentReducer,
  changeCheckStatusReducer,
  updateCommentReducer,
  deleteCommentReducer,
} from "./checkWfarReducers";

const store = configureStore({
  reducer: {
    login: authLoginReducer.reducer,
    register: authRegisterReducer.reducer,
    forgetPassword: forgetPasswordReducer.reducer,
    resetPassword: resetPasswordReducer.reducer,
    getPendingAccounts: getPendingAccountsReducer.reducer,
    acceptAccounts: acceptAccountsReducer.reducer,
    createSem: createSemReducer.reducer,
    getSems: getSemsReducer.reducer,
    getArchivedSems: getArchivedSemsReducer.reducer,
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
    archiveSem: archiveSemReducer.reducer,
    restoreSem: restoreSemReducer.reducer,
    activateSem: activateSemReducer.reducer,

    //wfar checking
    getCheckWfar: getCheckWfarReducer.reducer,
    postComment: postCommentReducer.reducer,
    changeCheckStatus: changeCheckStatusReducer.reducer,
    updateComment: updateCommentReducer.reducer,
    deleteComment: deleteCommentReducer.reducer,

    // For Demo purpose only

    getAllSems: getAllSemsReducer.reducer,
    getNotifications: getNotificationReducer.reducer,

    addSem: addSemReducer.reducer,
    myWfars: myWfarFetchReducer.reducer,
    myWfarCreate: myWfarCreateReducer.reducer,
    myWfarsArchived: myWfarsArchivedReducer.reducer,
    wfarSemesters: wfarSemestersReducer.reducer,
    myWfarSubmission: myWfarSubmissionReducer.reducer,
    myWfarUnsubmission: myWfarUnsubmissionReducer.reducer,
    myWfarSemesterFilter: myWfarSemesterFilterReducer.reducer,
    myWfarRefresh: myWfarRefreshReducer.reducer,
    myWfarEntryArchive: myWfarEntryArchiveReducer.reducer,
    myWfarEntryUnarchive: myWfarEntryUnarchiveReducer.reducer,
    myWfarEntryCreate: myWfarEntryCreateReducer.reducer,
    myWfarEntryUpdate: myWfarEntryUpdateReducer.reducer,
    myWfarFetchEntry: myWfarFetchEntryReducer.reducer,
    wfarRetrieveOverview: wfarRetrieveOverviewReducer.reducer,
    allWFARthisWeek: getAllWFARinThisWeekReducer.reducer,
    activeSem: getActiveSemReducer.reducer,
    allUsers: getAllUsersReducer.reducer,
    wfarPrintOverview: wfarPrintOverviewReducer.reducer,
    allWFARwholeSem: getWFARwholeSemReducer.reducer,
    allWFARcomments: getWFARCommentsReducer.reducer,
    wfarActiveSemester: wfarActiveSemesterReducer.reducer,
    wfarPrintIndividual: wfarPrintIndividualReducer.reducer,
    wfarSelectedSemester: wfarSelectedSemesterReducer.reducer,
    weeklyWfarRetrieve: weeklyWfarRetrieveReducer.reducer,
    weeklyWfarPrint: weeklyWfarPrintReducer.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
