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
import { forgetPassword } from "../../store/authActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import useValidateInput from "../../hooks/useValidateInput";

const ForgotPassword = () => {
  const IMAGE = {
    cictLogo: "asdd",
  };

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const forgetPasswordReducer = useSelector((state) => state.forgetPassword);
  const { error, isLoading, success } = forgetPasswordReducer;

  const [sendPasswordResetOnce, setSendPasswordResetOnce] = useState(true);

  const login = useSelector((state) => state.login);
  const { userInfo } = login;

  const onForgetHandler = (event) => {
    event.preventDefault(); // to prevent from sending request and from reloading the page

    if (enteredEmail == "" && !enteredEmailIsValid) {
      // alert("fields can't be empty");
      return;
    }
    let data = {
      email: enteredEmail,
    };
    if (sendPasswordResetOnce) {
      dispatch(forgetPassword(data));
    } else {
      alert("You already sent a password reset request!");
    }
  };
  useEffect(() => {
    if (success) {
      setSendPasswordResetOnce(false);
    }
    if (error) {
      setSendPasswordResetOnce(true);
    }
  }, [success, error]);
  // to remove animation in changing from login to reg vice versa

  const onNavigate = () => {
    localStorage.setItem("initialReload", "true");
    navigate("/");
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
  //Email Validations
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useValidateInput((value) => value.includes("@") && value.trim() !== "");

  let emailErrorMessage = "";
  if (!enteredEmail.includes("@") || enteredEmail === "") {
    emailErrorMessage = "Please enter a valid email address.";
  }
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
            <p>Forgot your password?</p>
            <p>Please enter your email</p>
          </div>
          {isLoading && <LoadingSpinner />}
          {success && <p className={styles["success"]}>{success}</p>}
          {error && <p className={styles["error"]}>{error}</p>}
          <form
            className={styles["form-container"]}
            action=""
            id="login-fields"
            onSubmit={onForgetHandler}
          >
            <div className={styles["form-field"]}>
              <InputField
                id="email"
                type="text"
                labelName=""
                name="email"
                placeholder="Email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                error={emailInputHasError ? emailErrorMessage : null}
                size="lg"
                // noLabel = "no-label-input"
                custom="form-control-custom"
                labelMargin="nm"
              />
              {/* <input type="text" placeholder="Username or Email"/> */}
            </div>
            <br></br>
            <div></div>
            <div className={styles["signin-button-container"]}>
              <SmallButton
                label="Request Password Reset"
                type="primary"
                size="l-l"
              ></SmallButton>
            </div>
            <div className={styles["signup-link"]}>
              <p>
                Remember password?
                <h5 onClick={onNavigate}> Sign in</h5>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default ForgotPassword;
