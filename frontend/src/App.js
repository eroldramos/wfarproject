import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SideNav from "./components/Layout/SideNav";
import Sample from "./components/Sample/Sample";
import RegisterScreen from "./components/Screens/RegisterScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import MySubmission from "./components/MySubmission/MySubmission";
import FacultySubmissionScreen from "./components/Screens/FacultySubmissionScreen"
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
          <Route path="/facultySubmission" element={<FacultySubmissionScreen />}></Route>
          <Route path="/sample" element={<Sample />}></Route>
          <Route path="/register" element={<RegisterScreen />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/mySubmission" element={<MySubmission />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
