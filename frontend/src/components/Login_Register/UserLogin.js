import styles from "./Login.module.css";
import cictLogo from "../../assets/Login_Register-Images/cict-logo.png";
// import cictBg from "../../assets/Login_Register-Images/cict_bg1.png";
import InputField from "../UI/FormControl/InputField/InputField";
import SmallButton from "../UI/FormControl/Button/SmallButton";
import Checkbox from "../UI/FormControl/Checkbox/Checkbox";
import React, { Fragment, useState, useEffect, Component } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Login.module.css";
import { login } from "../../store/authActions";
import { render } from "react-dom";

const Login = () => {
  const IMAGE = {
    cictLogo: "asdd",
  };

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(4);
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(window.localStorage.getItem('timer'));

  const [isEmptyPassword, setIsEmptyPassword] = useState(false);
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);

  const loggedUser = useSelector((state) => state.login);
  const { error, isLoading, userInfo } = loggedUser;

  const setUsernameValue = (event) => {
    setUsername(event.target.value);
    if (event.target.value.length > 0) {
      setIsEmptyEmail(false);
    } else {
      setIsEmptyEmail(true);
    }
  };

  const setPasswordValue = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length > 0) {
      setIsEmptyPassword(false);
    } else {
      setIsEmptyPassword(true);
    }
  };

  const onBlurEmail = (event) => {
    if (event.target.value.length > 0) {
      setIsEmptyEmail(false);
    } else {
      setIsEmptyEmail(true);
    }
  };

  const onBluPassword = (event) => {
    if (event.target.value.length > 0) {
      setIsEmptyPassword(false);
    } else {
      setIsEmptyPassword(true);
    }
  };

  function startTimer() {
    window.localStorage.setItem('timer', timer)
    if (timer > 0) {
      setTimeout(function () {
        setTimer(timer - 1);
        window.localStorage.setItem('timer', timer);
      }.bind(this), 1000)
    } else if (timer === 0) {
      setAttempts(4);
      setDisabled(false);
      setTimer(120);
      window.localStorage.setItem('timer', 120);
    }
  }

  function AttemptMessage(props) {
    if (attempts > 0) {
      return <p>Login attempts: {attempts}</p>;
    }
    startTimer();
    return <p>You have reached the maximum attempts. Please wait {timer} seconds</p>;
  }

  const onLoginHandler = (event) => {
    if (attempts === 1) {
      //disable na yung mga input fields
      setDisabled(true);
    }
    setAttempts(attempts - 1);

    event.preventDefault(); // to prevent from sending request and from reloading the page

    if (username == "" || password == "") {
      setIsEmptyEmail(true);
      setIsEmptyPassword(true);
      return;
    }

    console.log(username, password);
    dispatch(login(username, password, "Faculty"));
  };

  // to remove animation in changing from login to reg vice versa

  const onNavigateToSignUp = () => {
    localStorage.setItem("initialReload", "true");
    navigate("/register");
  };

  useEffect(() => {
    if (window.localStorage.getItem('timer') > 0 && window.localStorage.getItem('timer') < 120) {
      startTimer();
      setAttempts(0);
      setDisabled(true);
    } else {
      window.localStorage.setItem('timer', 120)
    }
    if (userInfo) {
      // if userInfo is null, can't be login
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  let inLoadClassForAnimation = "";
  if (localStorage.getItem("initialReload") == "true") {
    inLoadClassForAnimation = "login-form-delay";
  }

  const onNavigateForgetPassword = () => {
    localStorage.setItem("initialReload", "true");
    navigate("/forgot-password");
  };
  return (
    <Fragment>
      <div
        className={
          styles["login-form-container"] + " " + styles[inLoadClassForAnimation]
        }
      >
        <div className={styles["login-form"]}>
          <div className={styles["cict-wfar-logo"]}>
            <div className={styles["image-container"]}>
              <img src={cictLogo} />
            </div>
            <div>
              <p className={styles["cict-wfar"]}>CICT - WFAR</p>
              <p className={styles["management-system"]}>Management System</p>
            </div>
          </div>
          <div className={styles["form-greetings"]}>
            <p>Welcome Back!</p>
            <p>Please login to your account</p>
          </div>
          <div className={styles["error-handler-container"]}>
            {<p>{error}</p>}
          </div>
          <form
            className={styles["form-container"]}
            action=""
            id="login-fields"
            onSubmit={onLoginHandler}
          >
            <div className={styles["form-field"]}>
              <InputField
                id="sampleText"
                type="text"
                labelName=""
                inputName="username"
                placeholder="Username or Email"
                size="lg"
                noLabel="no-label-input"
                custom="form-control-custom"
                onChange={setUsernameValue}
                onBlur={onBlurEmail}
                disabled={disabled}
                value={username}
                error={isEmptyEmail ? "Please input a valid username." : null}
              />
              {/* <input type="text" placeholder="Username or Email"/> */}
            </div>
            <div className={styles["form-field"]}>
              <InputField
                id="sampleText"
                type="password"
                labelName=""
                inputName="password"
                placeholder="Password"
                size="lg"
                noLabel="no-label-input"
                custom="form-control-custom"
                disabled={disabled}
                onChange={setPasswordValue}
                onBlur={onBluPassword}
                value={password}
                error={
                  isEmptyPassword ? "Please input a valid password." : null
                }
              />
              {/* <input type="password" placeholder="Password"/> */}
            </div>
            <div>
              <div className={styles["form-fields"]}>
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  label=""
                  labelName="Remember me"
                  onChange={null}
                  type="filter"
                  custom="no-height"
                />
                {/* <input type="checkbox" name="remember-me" id="remember-me"/>
                                <label for="remember-me">Remember me</label> */}
              </div>
              <div className={styles["forgot-password"]}>
                <h5 onClick={onNavigateForgetPassword}>Forgot password?</h5>
              </div>
            </div>
            <div className={styles["signin-button-container"]}>
              <SmallButton
                label="Sign in"
                type="primary"
                size="l-l"
              ></SmallButton>
            </div>
            <div className={styles["signup-link"]}>
              <p>
                Don't have an account?
                <h5 onClick={onNavigateToSignUp}> Sign up</h5>
              </p>
            </div>
            <div className={styles["error-handler-container"]}>
              <div style={{ display: attempts < 4 ? 'block' : 'none' }}>
                {AttemptMessage()}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
