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
//for demo
import { getAllSemsReducer, addSemReducer } from "./sampleReducers";

// erika
import { myWfarsReducer, myWfarsArchivedReducer, wfarSemestersReducer } from './myWfarReducers';

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

    // For Demo purpose only

    getAllSems: getAllSemsReducer.reducer,

    addSem: addSemReducer.reducer,
    myWfars: myWfarsReducer.reducer,
    myWfarsArchived: myWfarsArchivedReducer.reducer,
    wfarSemesters: wfarSemestersReducer.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
