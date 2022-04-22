import "./App.css";
import SideNav from "./components/Layout/SideNav";
import TextField from "./components/UI/TextField";

function App() {
  return (
    <div>
      <SideNav></SideNav>
      <div id="main">
        <TextField id="sample" name="Sample" label="Sample Label" placeholder="Enter a text"></TextField>
        <TextField id="sample" name="Sample" label="Sample Label" placeholder="Enter a text"></TextField>
        <TextField id="sample" name="Sample" label="Sample Label" placeholder="Enter a text"></TextField>
        <TextField id="sample" name="Sample" label="Sample Label" placeholder="Enter a text"></TextField>
      </div>
    </div>
  );
}

export default App;
