import React, { Fragment, useState } from "react";
import InputField from "../UI/FormControl/InputField/InputField";
import classes from "./Login.module.css";
import Button from "../UI/FormControl/Button/Button";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUsernameValue = (event) => {
    setUsername(event.target.value);
  };

  const setPasswordValue = (event) => {
    setPassword(event.target.value);
  };
  const onLoginHandler = (event) => {
    event.preventDefault(); // to prevent from sending request and from reloading the page
    console.log(username, password);
  };
  return (
    <Fragment>
      <div className={classes.container}>
        <form onSubmit={onLoginHandler}>
          <h1 style={{ textAlign: "center" }}>Login Page</h1>
          <InputField
            id="username"
            name="username"
            label="Username"
            placeholder="Enter a username"
            onChange={setUsernameValue}
            value={username}
            error="invalid "
          />
          <InputField
            id="password"
            name="password"
            label="Password"
            placeholder="Enter a password"
            onChange={setPasswordValue}
            value={password}
            error={"hello"}
          />
          <Button label="Sign In" type="primary" />
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
