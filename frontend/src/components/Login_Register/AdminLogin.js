import styles from "./Login.module.css";
import cictLogo from "../../assets/Login_Register-Images/cict-logo.png";
// import cictBg from "../../assets/Login_Register-Images/cict_bg1.png";
import InputField from "../UI/FormControl/InputField/InputField";
import SmallButton from "../UI/FormControl/Button/SmallButton";
import Checkbox from "../UI/FormControl/Checkbox/Checkbox";
import React, { Fragment, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Login.module.css";
import { login } from "../../store/authActions";

let inLoadClassForAnimation = "";
if (localStorage.getItem("initialReload") == "true") {
  inLoadClassForAnimation = "login-form-delay";
  console.log(inLoadClassForAnimation);
}
localStorage.setItem("initialReload", "true");
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
    dispatch(login(username, password, "Admin"));
  };

  const onNavigateToSignUp = () => {
    navigate("/register");
  };

  const onNavigateForgetPassword = () => {
    localStorage.setItem("initialReload", "true");
    navigate("/forgot-password");
  };

  useEffect(() => {
    if (userInfo) {
      // if userInfo is null, can't be login
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  let inLoadClassForAnimation = "";
  if (localStorage.getItem("initialReload") == "true") {
    inLoadClassForAnimation = "login-form-delay";
  }

  localStorage.setItem("initialReload", "true");
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
            <p>Administrator Login</p>
            <p>Please login to your account</p>
          </div>
          {error && <p className={styles["error"]}>{error}</p>}
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
                value={username}
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
                onChange={setPasswordValue}
                value={password}
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
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
