import styles from "./Register.module.css";
import cictLogo from "../../assets/Login_Register-Images/cict-logo.png";
import InputField from "../UI/FormControl/InputField/InputField";
import React, { Fragment, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import useValidateInput from "../../hooks/useValidateInput";
import { useDispatch, useSelector } from "react-redux";
import CustomDropdownField from "../UI/FormControl/DropdownField/CustomDropdownField";
import SmallButton from "../UI/FormControl/Button/SmallButton";
import DateField from "../UI/FormControl/DateField/DateField";
import { register } from "../../store/authActions";
const Register = (props) => {

  
  const dispatch = useDispatch(); //use to call actions
  let navigate = useNavigate(); //use to navigate urls

  const registerUser = useSelector((state) => state.register);
  const { success, error, loading } = registerUser;

  useEffect(() => {
    if (success) {
      // if userInfo is null, can't be login
      console.log(success);
      navigate("/");
    }
    success = false;
  }, [navigate, success]);

  const GENDERS = [
    { label: "Please Select Gender", value: "" },
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
    { label: "Others", value: "3" },
  ];

  const CIVIL_STATUS = [
    { label: "Please Select Civil Status", value: "" },
    { label: "Married", value: "1" },
    { label: "Widowed ", value: "2" },
    { label: "Separated ", value: "3" },
    { label: "Divorced ", value: "4" },
    { label: "Single ", value: "5" },
  ];

  const onRegisterHandler = (event) => {
    event.preventDefault(); // to prevent from sending request and from reloading the page
    let formIsValid =
      enteredUsernameIsValid &&
      enteredEmailIsValid &&
      enteredPasswordIsValid &&
      enteredConfirmPasswordIsValid &&
      enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredMiddleNameIsValid &&
      enteredExtensionNameIsValid &&
      enteredBirthdateIsValid &&
      enteredCivilStatusIsValid &&
      enteredSexIsValid &&
      enteredHouseNoIsValid &&
      enteredStreetIsValid &&
      enteredSubdivisionIsValid &&
      enteredBarangayIsValid &&
      enteredMunicipalityIsValid &&
      enteredProvinceIsValid &&
      enteredZipCodeIsValid &&
      enteredContactNoIsValid &&
      enteredEmployeeNoIsValid;

    if (!formIsValid) {
      alert(formIsValid);
      return;
    }

    let registrationObj = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
      first_name: enteredFirstName,
      last_name: enteredLastName,
      middle_name: enteredMiddleName,
      extension_name: enteredExtensionName,
      birthdate: enteredBirthdate,
      civil_status: enteredCivilStatus,
      sex: enteredSex,
      house_no: enteredHouseNo,
      street: enteredStreet,
      subdivision: enteredSubdivision,
      barangay: enteredBarangay,
      municipality: enteredMunicipality,
      province: enteredProvince,
      zip_code: enteredZipCode,
      contact_no: enteredContactNo,
      emp_no: enteredEmployeeNo,
    };

    console.log(registrationObj);

    dispatch(register(registrationObj));
  };

  const onNavigateToLogin = () => { 
    localStorage.setItem("initialReload", "true"); 
    navigate("/");
  };

  // Username Validations
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useValidateInput(
    (value) => value.trim() !== "" && value.trim().length > 6
  );

  let usernameErrorMessage = "";

  if (enteredUsername === "") {
    usernameErrorMessage = "Please enter a valid username.";
  }
  if (enteredUsername.length <= 6 && enteredUsername !== "") {
    usernameErrorMessage =
      "Username must be at least morethan 6 characters long.";
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

  // Employee No Validations
  const {
    value: enteredEmployeeNo,
    isValid: enteredEmployeeNoIsValid,
    hasError: employeeNoInputHasError,
    valueChangeHandler: employeeNoChangeHandler,
    inputBlurHandler: employeeNoBlurHandler,
    reset: resetEmployeeNoInput,
  } = useValidateInput(
    (value) => value.trim() !== "" && onlyNumbers(value.trim())
  );
  function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }
  function onlyNumbersAndPlusSign(str){
    return /^[0-9+]+$/.test(str);
  }
  let employeeNoErrorMessage = "";
  if (
    enteredEmployeeNo.trim() === "" ||
    !onlyNumbers(enteredEmployeeNo.trim())
  ) {
    employeeNoErrorMessage = "Please enter a valid employee number.";
  }
  // First Name Validations
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useValidateInput((value) => value.trim() !== "");

  // Middle Name Validations
  const {
    value: enteredMiddleName,
    isValid: enteredMiddleNameIsValid,
    hasError: middleNameInputHasError,
    valueChangeHandler: middleNameChangeHandler,
    inputBlurHandler: middleNameBlurHandler,
    reset: resetMiddleNameInput,
  } = useValidateInput((value) => value.trim() !== "");

  // Last Name Validations
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useValidateInput((value) => value.trim() !== "");

  // Extension Name Validations
  const {
    value: enteredExtensionName,
    isValid: enteredExtensionNameIsValid,
    hasError: extensionNameInputHasError,
    valueChangeHandler: extensionNameChangeHandler,
    inputBlurHandler: extensionNameBlurHandler,
    reset: resetExtensionNameInput,
  } = useValidateInput((value) => value.trim() !== "");

  // Birthdate Validations
  const {
    value: enteredBirthdate,
    isValid: enteredBirthdateIsValid,
    hasError: birthdateInputHasError,
    valueChangeHandler: birthdateChangeHandler,
    inputBlurHandler: birthdateBlurHandler,
    reset: resetBirthdateInput,
  } = useValidateInput((value) => value.trim() !== "");

  // Civil Status Validations
  const {
    value: enteredCivilStatus,
    isValid: enteredCivilStatusIsValid,
    hasError: civilStatusInputHasError,
    valueChangeHandler: civilStatusChangeHandler,
    inputBlurHandler: civilStatusBlurHandler,
    reset: resetCivilStatusInput,
  } = useValidateInput((value) => value.trim() !== "");

  // Sex Validations
  const {
    value: enteredSex,
    isValid: enteredSexIsValid,
    hasError: sexInputHasError,
    valueChangeHandler: sexChangeHandler,
    inputBlurHandler: sexBlurHandler,
    reset: resetSex,
  } = useValidateInput((value) => value.trim() !== "");

  // House No Validations
  const {
    value: enteredHouseNo,
    isValid: enteredHouseNoIsValid,
    hasError: houseNoInputHasError,
    valueChangeHandler: houseNoChangeHandler,
    inputBlurHandler: houseNoBlurHandler,
    reset: resetHouseNo,
  } = useValidateInput(
    (value) => value.trim() !== "" && onlyNumbers(value.trim())
  );

  // Street Validations
  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useValidateInput((value) => value.trim() !== "");

  // Subdivision Validations
  const {
    value: enteredSubdivision,
    isValid: enteredSubdivisionIsValid,
    hasError: subdivisionInputHasError,
    valueChangeHandler: subdivisionChangeHandler,
    inputBlurHandler: subdivisionBlurHandler,
    reset: resetSubdivision,
  } = useValidateInput((value) => value.trim() !== "");

  // Barangay Validations
  const {
    value: enteredBarangay,
    isValid: enteredBarangayIsValid,
    hasError: barangayInputHasError,
    valueChangeHandler: barangayChangeHandler,
    inputBlurHandler: barangayBlurHandler,
    reset: resetBarangay,
  } = useValidateInput((value) => value.trim() !== "");

  // Municipality Validations
  const {
    value: enteredMunicipality,
    isValid: enteredMunicipalityIsValid,
    hasError: municipalityInputHasError,
    valueChangeHandler: municipalityChangeHandler,
    inputBlurHandler: municipalityBlurHandler,
    reset: resetMunicipality,
  } = useValidateInput((value) => value.trim() !== "");

  // Province Validations
  const {
    value: enteredProvince,
    isValid: enteredProvinceIsValid,
    hasError: provinceInputHasError,
    valueChangeHandler: provinceChangeHandler,
    inputBlurHandler: provinceBlurHandler,
    reset: resetProvince,
  } = useValidateInput((value) => value.trim() !== "");

  // Zip Code Validations
  const {
    value: enteredZipCode,
    isValid: enteredZipCodeIsValid,
    hasError: zipCodeInputHasError,
    valueChangeHandler: zipCodeChangeHandler,
    inputBlurHandler: zipCodeBlurHandler,
    reset: resetZipCode,
  } = useValidateInput(
    (value) => value.trim() !== "" && onlyNumbersAndPlusSign(value.trim())
  );

  // Contact No Validations
  const {
    value: enteredContactNo,
    isValid: enteredContactNoIsValid,
    hasError: contactNoInputHasError,
    valueChangeHandler: contactNoChangeHandler,
    inputBlurHandler: contactNoBlurHandler,
    reset: resetContactNo,
  } = useValidateInput(
    (value) => value.trim() !== "" && onlyNumbers(value.trim())
  );

  
  let inLoadClassForAnimation = "";
  if(localStorage.getItem("initialReload") == "true"){
    inLoadClassForAnimation = "register-form-delay";
    console.log(inLoadClassForAnimation);
  }
  
  return (
    <Fragment>
      <div className={styles["register-form-container"] + " " + styles[inLoadClassForAnimation]}>
        <div className={styles["register-form"]}>
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
            <p>Welcome to CICT WFAR!</p>
            <p>Please create an account to continue</p>
          </div>

          <div className={styles["error-handler-container"]}>
            {error && error.map((err, index) => <p >{error[index]}</p>)}
          </div>
          <form
            className={styles["form-container"]}
            action=""
            id="register-fields"
            onSubmit={onRegisterHandler}
          >
            <div className={styles["register-form-section"]}>
              <p>Employee Information</p>
              <hr />
              <div className={styles["form-field"]}>
                <InputField
                  id="empNo"
                  type="text"
                  name="empNo"
                  labelName="Employee Number"
                  //inputName="empNo"
                  placeholder="Employee Number"
                  onChange={employeeNoChangeHandler}
                  onBlur={employeeNoBlurHandler}
                  value={enteredEmployeeNo}
                  error={
                    employeeNoInputHasError ? employeeNoErrorMessage : null
                  }
                  size="lg"
                  // noLabel = "no-label-input"
                  custom="form-control-custom"
                  labelMargin="nm"
                />
                {/* <label for="">Employee Number</label>
                            <input type="text" placeholder="Employee Number"/> */}
              </div>
              <div className={styles["form-field"]}>
                <InputField
                  id="firstName"
                  type="text"
                  labelName="First Name"
                  name="firstName"
                  //   inputName=""
                  placeholder="First Name"
                  onChange={firstNameChangeHandler}
                  onBlur={firstNameBlurHandler}
                  value={enteredFirstName}
                  error={
                    firstNameInputHasError
                      ? "Please enter a valid first name."
                      : null
                  }
                  size="lg"
                  // noLabel = "no-label-input"
                  custom="form-control-custom"
                  labelMargin="nm"
                />
                {/* <label for="">First Name</label>
                            <input type="text" placeholder="First Name"/> */}
              </div>
              <div className={styles["form-field"]}>
                <InputField
                  id="middleName"
                  type="text"
                  labelName="Middle Name"
                  name="middleName"
                  placeholder="Middle Name"
                  onChange={middleNameChangeHandler}
                  onBlur={middleNameBlurHandler}
                  value={enteredMiddleName}
                  error={
                    middleNameInputHasError
                      ? "Please enter a middle name. Enter N/A if not available"
                      : null
                  }
                  size="lg"
                  // noLabel = "no-label-input"
                  custom="form-control-custom"
                  labelMargin="nm"
                />
                {/* <label for="">Middle Name</label>
                            <input type="text" placeholder="Middle Name"/> */}
              </div>
              <div
                className={
                  styles["registration-double-form"] +
                  " " +
                  styles["registration-double-form2"]
                }
              >
                <div className={styles["form-field"]}>
                  <InputField
                    id="lastName"
                    type="text"
                    labelName="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={lastNameChangeHandler}
                    onBlur={lastNameBlurHandler}
                    value={enteredLastName}
                    error={
                      lastNameInputHasError ? "Please enter a last name." : null
                    }
                    size="lg"
                    // noLabel = "no-label-input"
                    custom="form-control-custom"
                    labelMargin="nm"
                  />
                  {/* <label for="">Last Name</label>
                                <input type="text" placeholder="Last Name"/> */}
                </div>
                <div className={styles["form-field"]}>
                  <InputField
                    id="extensionName"
                    type="text"
                    labelName="Extension Name"
                    name="extensionName"
                    placeholder="Extension Name"
                    onChange={extensionNameChangeHandler}
                    onBlur={extensionNameBlurHandler}
                    value={enteredExtensionName}
                    error={
                      extensionNameInputHasError
                        ? "Please enter an extension name. Enter N/A if not available."
                        : null
                    }
                    size="lg"
                    // noLabel = "no-label-input"
                    custom="form-control-custom"
                    labelMargin="nm"
                  />
                  {/* <label for="">Last Name</label>
                                <input type="text" placeholder="Last Name"/> */}
                </div>
              </div>
            </div>
            <div className={styles["register-form-section"]}>
              <p>Account Information</p>
              <hr />
              <div className={styles["form-field"]}>
                <InputField
                  id="username"
                  type="text"
                  labelName="Username"
                  name="username"
                  placeholder="Username"
                  onChange={usernameChangeHandler}
                  onBlur={usernameBlurHandler}
                  value={enteredUsername}
                  error={usernameInputHasError ? usernameErrorMessage : null}
                  size="lg"
                  // noLabel = "no-label-input"
                  custom="form-control-custom"
                  labelMargin="nm"
                />
                {/* <label for="">Username</label>
                            <input type="text" placeholder="Username"/> */}
              </div>
              <div className={styles["form-field"]}>
                <InputField
                  id="email"
                  type="text"
                  labelName="Email"
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
                {/* <label for="">Email</label>
                            <input type="email" placeholder="Email"/> */}
              </div>
              <div className={styles["registration-double-form"]}>
                <div className={styles["form-field"]}>
                  <InputField
                    id="password"
                    type="password"
                    labelName="Password"
                    name="password"
                    placeholder="Password"
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
                    labelName="Confirm Password"
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
                  {/* <label for="">Confirm Password</label>
                                <input type="password" placeholder="Confirm Password"/> */}
                </div>
              </div>
            </div>
            <div className={styles["register-form-section"]}>
              <p>Personal Information</p>
              <hr />
              <div className={styles["registration-double-form"]}>
                <div className={styles["form-field"]}>
                  <CustomDropdownField
                    id="civilStatus"
                    name="civilStatus"
                    labelName="Civil Status"
                    onChange={civilStatusChangeHandler}
                    onBlur={civilStatusBlurHandler}
                    value={enteredCivilStatus}
                    options={CIVIL_STATUS}
                    type="form"
                    error={
                      civilStatusInputHasError
                        ? "Please select a civil status."
                        : null
                    }
                    size="l"
                  />
                  {/* <label for="">Birthdate</label>
                                <input type="date" placeholder="Birthdate"/> */}
                </div>
                <div className={styles["form-field"]}>
                  <CustomDropdownField
                    id="sex"
                    name="sex"
                    labelName="Sex"
                    options={GENDERS}
                    onChange={sexChangeHandler}
                    onBlur={sexBlurHandler}
                    value={enteredSex}
                    type="form"
                    error={sexInputHasError ? "Please select a gender." : null}
                    size="l"
                  />
                  {/* <label for="">Sex</label>
                                <select id="sex" name="sex">
                                    <option selected disabled>Select one</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select> */}
                </div>
              </div>
              <div className={styles["form-field"]}>
                <DateField
                  id="birthdate"
                  name="birthdate"
                  labelName="Birthdate"
                  placeholder="Enter a birthdate"
                  onChange={birthdateChangeHandler}
                  onBlur={birthdateBlurHandler}
                  value={enteredBirthdate}
                  error={
                    birthdateInputHasError ? "Please select a date." : null
                  }
                  size="md"
                  labelMargin="nm"
                  formPadding="cp" // custom padding
                />
                {/* <label for="">Civil Status</label>
                            <select id="civil-status" name="civil-status">
                                <option selected disabled>Select one</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="separated">Separated </option>
                                <option value="widowed">Widowed</option>
                            </select> */}
              </div>
            </div>
            <div className={styles["register-form-section"]}>
              <p>Contact Information</p>
              <hr />
              <div className={styles["registration-double-form"]}>
                <div className={styles["form-field"]}>
                  <InputField
                    id="street"
                    type="text"
                    labelName="Street Name"
                    name="street"
                    placeholder="Street Name"
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                    value={enteredStreet}
                    error={
                      streetInputHasError
                        ? "Please enter a valid street."
                        : null
                    }
                    size="lg"
                    // noLabel = "no-label-input"
                    custom="form-control-custom"
                    labelMargin="nm"
                  />
                  {/* <label for="">Street Name</label>
                                <input type="text" placeholder="Street Name"/> */}
                </div>
                <div className={styles["form-field"]}>
                  <InputField
                    id="houseNo"
                    type="text"
                    labelName="House Number"
                    name="houseNo"
                    placeholder="House Number"
                    onChange={houseNoChangeHandler}
                    onBlur={houseNoBlurHandler}
                    value={enteredHouseNo}
                    error={
                      houseNoInputHasError
                        ? "Please enter a valid house no.."
                        : null
                    }
                    size="lg"
                    // noLabel = "no-label-input"
                    custom="form-control-custom"
                    labelMargin="nm"
                  />
                  {/* <label for="">Barangay/District</label>
                                <input type="text" placeholder="Barangay/District"/> */}
                </div>
              </div>
              <div className={styles["registration-double-form"]}>
                <div className={styles["form-field"]}>
                  <InputField
                    id="subdivision"
                    type="text"
                    labelName="Subdivision"
                    name="subdivision"
                    placeholder="Subdivision"
                    onChange={subdivisionChangeHandler}
                    onBlur={subdivisionBlurHandler}
                    value={enteredSubdivision}
                    error={
                      subdivisionInputHasError
                        ? "Please enter a valid subdivision."
                        : null
                    }
                    size="lg"
                    // noLabel = "no-label-input"
                    custom="form-control-custom"
                    labelMargin="nm"
                  />
                  {/* <label for="">Street Name</label>
                                <input type="text" placeholder="Street Name"/> */}
                </div>
                <div className={styles["form-field"]}>
                  <InputField
                    id="barangay"
                    type="text"
                    labelName="Barangay/District"
                    name="barangay"
                    placeholder="Barangay/District"
                    onChange={barangayChangeHandler}
                    onBlur={barangayBlurHandler}
                    value={enteredBarangay}
                    error={
                      barangayInputHasError
                        ? "Please enter a valid barangay."
                        : null
                    }
                    size="lg"
                    // noLabel = "no-label-input"
                    custom="form-control-custom"
                    labelMargin="nm"
                  />
                  {/* <label for="">Barangay/District</label>
                                <input type="text" placeholder="Barangay/District"/> */}
                </div>
              </div>
              <div className={styles["registration-double-form"]}>
                <div className={styles["form-field"]}>
                  <InputField
                    id="municipality"
                    type="text"
                    labelName="City/Municipality"
                    name="municipality"
                    placeholder="City/Municipality"
                    onChange={municipalityChangeHandler}
                    onBlur={municipalityBlurHandler}
                    value={enteredMunicipality}
                    error={
                      municipalityInputHasError
                        ? "Please enter a valid municipality."
                        : null
                    }
                    size="lg"
                    // noLabel = "no-label-input"
                    custom="form-control-custom"
                    labelMargin="nm"
                  />
                  {/* <label for="">City/Municipality</label>
                                <input type="text" placeholder="City/Municipality"/> */}
                </div>
                <div className={styles["form-field"]}>
                  <InputField
                    id="province"
                    type="text"
                    labelName="Province/State"
                    name="province"
                    placeholder="Province/State"
                    onChange={provinceChangeHandler}
                    onBlur={provinceBlurHandler}
                    value={enteredProvince}
                    error={
                      provinceInputHasError
                        ? "Please enter a valid province."
                        : null
                    }
                    size="lg"
                    // noLabel = "no-label-input"
                    custom="form-control-custom"
                    labelMargin="nm"
                  />
                  {/* <label for="">Province/State</label>
                                <input type="text" placeholder="Province/State"/> */}
                </div>
              </div>
              <div className={styles["registration-double-form"]}>
                <div className={styles["form-field"]}>
                  <InputField
                    id="zipCode"
                    type="text"
                    labelName="Zip Code"
                    name="zipCode"
                    placeholder="Zip Code"
                    onChange={zipCodeChangeHandler}
                    onBlur={zipCodeBlurHandler}
                    value={enteredZipCode}
                    error={
                      zipCodeInputHasError
                        ? "Please enter a valid zip code."
                        : null
                    }
                    size="lg"
                    // noLabel = "no-label-input"
                    custom="form-control-custom"
                    labelMargin="nm"
                  />
                  {/* <label for="">Contact Number</label>
                                <input type="number" placeholder="Contact Number"/> */}
                </div>
                <div className={styles["form-field"]}>
                  <InputField
                    id="contactNo"
                    type="tel"
                    labelName="Contact Number"
                    name="contactNo"
                    placeholder="Ex. 0956"
                    onChange={contactNoChangeHandler}
                    onBlur={contactNoBlurHandler}
                    value={enteredContactNo}
                    error={
                      contactNoInputHasError
                        ? "Please enter a contact no.."
                        : null
                    }
                    size="lg"
                    // noLabel = "no-label-input"
                    custom="form-control-custom"
                    labelMargin="nm"
                  />
                  {/* <label for="">Province/State</label>
                                <input type="text" placeholder="Province/State"/> */}
                </div>
              </div>
            </div>
            <SmallButton
              label="Sign Up"
              type="primary"
              size="l-l"
            ></SmallButton>
            <div className={styles["signin-link"]}>
              <p>
                Already have an account?
                <h5 onClick={onNavigateToLogin}> Sign in</h5>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Register;
