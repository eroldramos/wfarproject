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
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Login.module.css";
import { resetPassword } from "../../store/authActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import useValidateInput from "../../hooks/useValidateInput";
import Swal from "sweetalert2";
const ResetPassword = () => {
  const IMAGE = {
    cictLogo: "asdd",
  };

  const params = useParams();

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.login);
  const { userInfo } = loggedUser;

  const resetPasswordReducer = useSelector((state) => state.resetPassword);
  const { isLoading, success, error } = resetPasswordReducer;

  const onForgetHandler = (event) => {
    event.preventDefault(); // to prevent from sending request and from reloading the page

    if (
      enteredPassword == "" ||
      enteredConfirmPassword == "" ||
      !enteredPasswordIsValid ||
      !enteredConfirmPasswordIsValid
    ) {
      alert("form is invalid");
      return;
    }
    let data = {
      new_password: enteredPassword,
    };
    dispatch(resetPassword(data, params.token));
  };
  useEffect(() => {
    if (success) {
      Swal.fire({
        html: `<h4>${success}</h4>` + "<h5>Click ok to login.</h5>",
        icon: "warning",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "OK",
        iconColor: "#D1D1D1", // question icon color
        confirmButtonColor: "#BE5A40",
        cancelButtonColor: "#A1A1A1",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("initialReload", "true");
          navigate("/");
        } else if (result.isDenied) {
        } else if (result.isDismissed) {
        }
      });
    }
  }, [success]);
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
  //Password Validations
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useValidateInput(
    (value) =>
      value.trim() !== "" &&
      value.trim().length > 8 &&
      containsNumber(value.trim())
  );

  function containsNumber(str) {
    return /[0-9]/.test(str);
  }

  let passwordErrorMessage = "";

  if (enteredPassword === "") {
    passwordErrorMessage = "Please enter a valid password.";
  }
  if (enteredPassword.length <= 8 && enteredPassword !== "") {
    passwordErrorMessage =
      "Character must be at least morethan 8 characters long.";
  }
  if (!containsNumber(enteredPassword.trim()) && enteredPassword !== "") {
    passwordErrorMessage = "Please include a number in the password.";
  }
  //  Confirm Password Validations

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useValidateInput(
    (value) => value.trim() !== "" && value.trim() === enteredPassword.trim()
  );
  let confirmPasswordErrorMessage = "";
  if (
    enteredConfirmPassword !== enteredPassword ||
    enteredConfirmPassword === ""
  ) {
    confirmPasswordErrorMessage = "Password and confirm password do not match.";
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
            <p>Password reset.</p>
            <p>Please enter a new password.</p>
          </div>
          {isLoading && <LoadingSpinner />}
          {/* {success && <p className={styles["success"]}>{success}</p>} */}
          {error && <p className={styles["error"]}>{error}</p>}
          <form
            className={styles["form-container"]}
            action=""
            id="login-fields"
            onSubmit={onForgetHandler}
          >
            <div className={styles["form-field"]}>
              <InputField
                id="password"
                type="password"
                labelName=""
                name="password"
                placeholder="New Password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
                error={passwordInputHasError ? passwordErrorMessage : null}
                size="lg"
                // noLabel = "no-label-input"
                custom="form-control-custom"
                labelMargin="nm"
              />
              {/* <label for="">Password</label>
                                <input type="password" placeholder="Password"/> */}
            </div>
            <div className={styles["form-field"]}>
              <InputField
                id="confirmPassowrd"
                type="password"
                labelName=""
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
                value={enteredConfirmPassword}
                error={
                  confirmPasswordInputHasError
                    ? confirmPasswordErrorMessage
                    : null
                }
                size="lg"
                // noLabel = "no-label-input"
                custom="form-control-custom"
                labelMargin="nm"
              />
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
export default ResetPassword;
