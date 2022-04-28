import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SideNav from "./components/Layout/SideNav";
import Sample from "./components/Sample/Sample";
import RegisterScreen from "./components/Screens/RegisterScreen";

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
<<<<<<< HEAD
          <Route path="/sample" element={<Sample />}></Route>
          <Route path="/register" element={<RegisterScreen />}></Route>
=======
          <Route path='/sample' element={<Sample />}></Route>
>>>>>>> 3b90cbe2d757c5f9dc23535bddbd3d2e3ae2dd9f
        </Routes>
      </div>
    </div>
  );
}

export default App;
