import { useState } from "react";
import "./App.css";
import SideNav from "./components/Layout/SideNav";
import Sample from "./components/Sample/Sample";

function App() {

  // sample use state for two-way binding
  const [sampleValue, setSampleValue] = useState('');

  const sampleOnChangeHandlerFunction = (event) => {
    console.log(event.target.value); // outputs the value on console
    setSampleValue(event.target.value);
  }

  return (
    <div>
      <SideNav userLevel="1"></SideNav>
      <div id="main">
        <Sample></Sample>
      </div>
    </div>
  );
}

export default App;
