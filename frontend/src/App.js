import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SideNav from "./components/Layout/SideNav";
import Sample from "./components/Sample/Sample";
import RegisterScreen from "./components/Screens/RegisterScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import PendingAccountsScreen from "./components/Screens/PendingAccountsScreen";
import AdminLoginScreen from "./components/Screens/AdminLoginScreen";
import MySubmission from "./components/MySubmission/MySubmission";
import FacultySubmissionScreen from "./components/Screens/FacultySubmissionScreen";
import WeeklyView from "./components/FacultySubmissions/WeeklyView/WeeklyView";
import WFARCheckingScreen from "./components/Screens/WFARCheckingScreen";
import ManageSemestersScreen from "./components/Screens/ManageSemestersScreen";
import AddEntry from "./components/WfarForm/AddEntry";
import Dashboard from "./components/Dashboard/Dashboard";
import DummyDashBoard from "./components/Sample/DummyDashBoard";
import CreateSemesterScreen from "./components/Screens/CreateSemesterScreen";
import EditSemesterScreen from "./components/Screens/EditSemesterScreen";
function App() {
  // sample use state for two-way binding
  const [sampleValue, setSampleValue] = useState("");

  const sampleOnChangeHandlerFunction = (event) => {
    console.log(event.target.value); // outputs the value on console
    setSampleValue(event.target.value);
  };

  return (
    <div>
      <SideNav userLevel="1"></SideNav>
      <div id="main">
        <Routes>
          <Route path="/dummydashboard" element={<DummyDashBoard />}></Route>
          {/* dont remove, for testing of logout only. */}
          <Route path="/OverView" element={<FacultySubmissionScreen />}></Route>
          <Route path="/WeeklyView" element={<WeeklyView />}></Route>
          <Route path="/WFARChecking" element={<WFARCheckingScreen />}></Route>
          <Route path="/sample" element={<Sample />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/register" element={<RegisterScreen />}></Route>
          <Route path="/" element={<LoginScreen />}></Route>
          <Route path="/admin-login" element={<AdminLoginScreen />}></Route>
          <Route path="/mySubmission" element={<MySubmission />}></Route>
          <Route
            path="/manage-semesters/"
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
          <Route path="/addEntry" element={<AddEntry />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
