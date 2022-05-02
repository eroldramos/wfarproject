import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SideNav from "./components/Layout/SideNav";
import Sample from "./components/Sample/Sample";
import DummyDashBoard from "./components/Sample/DummyDashBoard";
import RegisterScreen from "./components/Screens/RegisterScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import AdminLoginScreen from "./components/Screens/AdminLoginScreen";
import MySubmission from "./components/MySubmission/MySubmission";
import FacultySubmissionScreen from "./components/Screens/FacultySubmissionScreen";
import AddEntry from "./components/WfarForm/AddEntry";
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
          <Route
            path="/facultySubmission"
            element={<FacultySubmissionScreen />}
          ></Route>
          <Route path="/sample" element={<Sample />}></Route>
          <Route path="/dummydashboard" element={<DummyDashBoard />}></Route>
          <Route path="/register" element={<RegisterScreen />}></Route>
          <Route path="/" element={<LoginScreen />}></Route>
          <Route path="/admin-login" element={<AdminLoginScreen />}></Route>
          <Route path="/mySubmission" element={<MySubmission />}></Route>
          <Route path="/addEntry" element={<AddEntry />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
