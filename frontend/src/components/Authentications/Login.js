import React, { Fragment, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../UI/FormControl/InputField/InputField";
import classes from "./Login.module.css";
import Button from "../UI/FormControl/Button/Button";
import { login } from "../../store/authActions";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loggedUser = useSelector((state) => state.login);
  const { error, isLoading, userInfo } = loggedUser;

  const setUsernameValue = (event) => {
    setUsername(event.target.value);
  };

  const setPasswordValue = (event) => {
    setPassword(event.target.value);
  };

  const onLoginHandler = (event) => {
    event.preventDefault(); // to prevent from sending request and from reloading the page

    if (username == "" || password == "") {
      alert("fields can't be empty");
      return;
    }

    console.log(username, password);
    dispatch(login(username, password, "Faculty"));
  };

  useEffect(() => {
    if (userInfo) {
      // if userInfo is null, can't be login
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);
  return (
    <Fragment>
      <div className={classes.container}>
        <form onSubmit={onLoginHandler}>
          <h1 style={{ textAlign: "center" }}>Login Page</h1>
          {error && <p>{error}</p>}
          {isLoading && <p>loading...</p>}
          <InputField
            id="username"
            name="username"
            label="Username"
            placeholder="Enter a username"
            onChange={setUsernameValue}
            value={username}
            error={null}
          />
          <InputField
            id="password"
            name="password"
            label="Password"
            placeholder="Enter a password"
            onChange={setPasswordValue}
            value={password}
            error={null}
          />
          <Button label="Sign In" type="primary" />
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
