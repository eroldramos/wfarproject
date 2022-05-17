import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SideNav from "./components/Layout/SideNav";
import Sample from "./components/Sample/Sample";
import RegisterScreen from "./components/Screens/RegisterScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import PendingAccountsScreen from "./components/Screens/PendingAccountsScreen";
import AdminLoginScreen from "./components/Screens/AdminLoginScreen";
import MySubmissionScreen from "./components/Screens/MySubmissionScreen";
import FacultySubmissionScreen from "./components/Screens/FacultySubmissionScreen";
import WeeklyView from "./components/FacultySubmissions/WeeklyView/WeeklyView";
import WFARCheckingScreen from "./components/Screens/WFARCheckingScreen";
import ManageSemestersScreen from "./components/Screens/ManageSemestersScreen";
import AddEntry from "./components/WfarForm/AddEntry/AddEntry";
import EditEntry from "./components/WfarForm/EditEntry/EditEntry";
import Dashboard from "./components/Dashboard/Dashboard";
import DummyDashBoard from "./components/Sample/DummyDashBoard";
import CreateSemesterScreen from "./components/Screens/CreateSemesterScreen";
import EditSemesterScreen from "./components/Screens/EditSemesterScreen";
import AccountScreen from "./components/Screens/AccountScreen";
import ManageFacultiesScreen from "./components/Screens/ManageFacultiesScreen";
import SampleRedux from "./SampleRedux";
import { useDispatch } from "react-redux";
import { createWfar } from "./store/myWfarsActions";

function App() {
  const dispatch = useDispatch();

  // sample use state for two-way binding
  const [sampleValue, setSampleValue] = useState("");

  const sampleOnChangeHandlerFunction = (event) => {
    console.log(event.target.value); // outputs the value on console
    setSampleValue(event.target.value);
  };

  // patulong na lang po magdetermined kung naka-login na ba o hindi, saka po natin i-run 'yung use effect
  useEffect(() => {
    dispatch(createWfar());
  }, []);

  return (
    <div>
      {/* {haveSession && } */}
      <SideNav userLevel="1"></SideNav>
      <div id="main">
        <Routes>
          <Route path="/dummydashboard" element={<DummyDashBoard />}></Route>
          {/* dont remove, for testing of logout only. */}
          <Route path="/OverView" element={<FacultySubmissionScreen />}></Route>
          <Route path="/WeeklyView" element={<WeeklyView />}></Route>
          <Route path="/WFARChecking" element={<WFARCheckingScreen />}></Route>
          <Route path="/sample/*" element={<Sample />}></Route>
          {/* /sample/* asterisk means there are child or nested routes inside of that page or element */}

          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/register" element={<RegisterScreen />}></Route>
          <Route path="/" element={<SampleRedux />}></Route>
          <Route path="/admin-login" element={<AdminLoginScreen />}></Route>
          <Route
            path="/mySubmission/*"
            element={<MySubmissionScreen />}
          ></Route>
          <Route path="/profile" element={<AccountScreen />}></Route>
          <Route
            path="/manage-faculty/*"
            element={<ManageFacultiesScreen />}
          ></Route>

          <Route
            path="/manage-semesters/*"
            element={<ManageSemestersScreen />}
          ></Route>
          <Route
            path="/create-semester"
            element={<CreateSemesterScreen />}
          ></Route>
          <Route
            path="/edit-semester/:semId/"
            element={<EditSemesterScreen />}
          ></Route>
          <Route
            path="/pending-accounts/"
            element={<PendingAccountsScreen />}
          ></Route>
          <Route
            path="/mySubmission/wfar/:id/add-entry"
            element={<AddEntry />}
          ></Route>
          <Route
            path="/mySubmission/wfar/:id/week/:weekNo/add-entry"
            element={<AddEntry />}
          ></Route>
          <Route
            path="/mySubmission/wfar/:wfar_id/week/:weekNo/edit-entry/:id"
            element={<EditEntry />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
