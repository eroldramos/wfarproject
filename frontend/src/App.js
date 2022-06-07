import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SideNav from "./components/Layout/SideNav";
import Sample from "./components/Sample/Sample";
import RegisterScreen from "./components/Screens/RegisterScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import PendingAccountsScreen from "./components/Screens/PendingAccountsScreen";
import AdminLoginScreen from "./components/Screens/AdminLoginScreen";
import MySubmissionScreen from "./components/Screens/MySubmissionScreen";
import WFARCheckingScreen from "./components/Screens/WFARCheckingScreen";
import ManageSemestersScreen from "./components/Screens/ManageSemestersScreen";
import AddEntry from "./components/WfarForm/AddEntry/AddEntry";
import EditEntry from "./components/WfarForm/EditEntry/EditEntry";
import Dashboard from "./components/Dashboard/Dashboard";
import DummyDashBoard from "./components/Sample/DummyDashBoard";
import CreateSemesterScreen from "./components/Screens/CreateSemesterScreen";
import EditSemesterScreen from "./components/Screens/EditSemesterScreen";
import AccountScreen from "./components/Screens/AccountScreen";
import FacultyView from "./components/Screens/FacultyView";
import ManageFacultiesScreen from "./components/Screens/ManageFacultiesScreen";
import WFARSubmissionsOverview from "./components/Screens/ManageFacultiesScreen";
import SampleRedux from "./SampleRedux";
import { useDispatch } from "react-redux";
import { createWfar } from "./store/myWfarsActions";
import FacultySubmissionScreen from "./components/Screens/FacultySubmissionScreen";
import Login from "./components/Login_Register/UserLogin";
import Register from "./components/Login_Register/UserRegister";
import LandingPage from "./components/Login_Register/LandingPage";
import { useSelector } from "react-redux";
import ViewEntryModal from "./components/MySubmission/ViewEntryModal/ViewEntryModal";
import UserProfile from "./components/Account/UserProfile";

function App() {
  const dispatch = useDispatch();

  // sample use state for two-way binding
  const [sampleValue, setSampleValue] = useState("");

  const sampleOnChangeHandlerFunction = (event) => {
    console.log(event.target.value); // outputs the value on console
    setSampleValue(event.target.value);
  };

  const loggedUser = useSelector((state) => state.login);
  const { error, isLoading, userInfo } = loggedUser;

  useEffect(() => {
    if (userInfo != null) {
      console.log(userInfo);
      if (!userInfo.isAdmin) {
        console.log("WFAR creation");
        dispatch(createWfar());
      }
    }
  }, [userInfo]);

  return (
    <div className="for-login-container">
      {userInfo && <SideNav userLevel="1"></SideNav>}

      <div id="main">
        <Routes>
          <Route path="/dummydashboard" element={<DummyDashBoard />}></Route>
          {/* <Route path="/" element={<LandingPage />}></Route> */}
          {/* dont remove, for testing of logout only. */}
          <Route
            path="/WFARChecking/:id/"
            element={<WFARCheckingScreen />}
          ></Route>

          <Route
            path="/FacultySubmission/*"
            element={<FacultySubmissionScreen />}
          ></Route>

          <Route path="/sample/*" element={<Sample />}></Route>
          {/* /sample/* asterisk means there are child or nested routes inside of that page or element */}

          <Route path="/dashboard" element={<Dashboard />}></Route>
          {/* <Route path="/LoginScreen" element={<LoginScreen />}></Route> */}
          {/* <Route path="/register" element={<RegisterScreen />}></Route> */}
          {/* <Route path="/" element={<SampleRedux />}></Route> */}
          {/* <Route path="/admin-login" element={<AdminLoginScreen />}></Route> */}
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
            path="/view-faculty/*"
            element={<FacultyView />}
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
          <Route path="/ViewEntryModal" element={<ViewEntryModal />}></Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>

          {/* AUTHENTICATION ROUTES */}
          <Route path="/*" element={<LandingPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
