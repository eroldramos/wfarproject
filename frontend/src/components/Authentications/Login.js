import React, { Fragment } from "react";
import TextField from "../UI/FormControl/InputField/TextField";
import classes from "./Login.module.css";
const Login = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div>
          <h1>Login Page</h1>
          <TextField
            id="username"
            name="username"
            label="Username"
            placeholder="Enter a username"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            placeholder="Enter a password"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
