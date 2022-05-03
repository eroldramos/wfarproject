import React, { Fragment, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../UI/FormControl/InputField/InputField";
import DateField from "../UI/FormControl/DateField/DateField";
import classes from "./Register.module.css";
import Button from "../UI/FormControl/Button/Button";
import DropdownField from "../UI/FormControl/DropdownField/DropdownField";
import useValidateInput from "../../hooks/useValidateInput";
import { register } from "../../store/authActions";

const Register = () => {
  const dispatch = useDispatch(); //use to call actions
  let navigate = useNavigate(); //use to navigate urls

  const registerUser = useSelector((state) => state.register);
  const { success, error, loading } = registerUser;

  useEffect(() => {
    if (success) {
      // if userInfo is null, can't be login
      navigate("/dummydashboard");
    }
  }, [navigate, success]);

  const GENDERS = [
    { label: "--Please Select Gender--", value: "" },
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
    { label: "Others", value: "3" },
  ];

  const CIVIL_STATUS = [
    { label: "--Please Select Civil Status--", value: "" },
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
      "Character must be at least morethan 6 characters long.";
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
    (value) => value.trim() !== "" && onlyNumbers(value.trim())
  );

  // House No Validations
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
  return (
    <Fragment>
      <div className={classes.container}>
        <form onSubmit={onRegisterHandler}>
          <h1 style={{ textAlign: "center" }}>Register Page</h1>
          {error && error.map((err, index) => <p>{error[index]}</p>)}
          {loading && <p>loading...</p>}
          {success && <p>{success}</p>}
          <InputField
            type="text"
            id="username"
            name="username"
            labelName="Username"
            placeholder="Enter a username"
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            value={enteredUsername}
            error={usernameInputHasError ? usernameErrorMessage : null}
          />

          <InputField
            type="text"
            id="email"
            name="email"
            labelName="Email"
            placeholder="Enter an email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            error={emailInputHasError ? emailErrorMessage : null}
          />
          <InputField
            type="password"
            id="password"
            name="password"
            labelName="Password"
            placeholder="Enter a password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            error={passwordInputHasError ? passwordErrorMessage : null}
          />

          <InputField
            type="password"
            id="confirmPassowrd"
            name="confirmPassword"
            labelName="Confirm Password"
            placeholder="Confirm password"
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            value={enteredConfirmPassword}
            error={
              confirmPasswordInputHasError ? confirmPasswordErrorMessage : null
            }
          />
          <InputField
            type="text"
            id="empNo"
            name="empNo"
            labelName="Employee No."
            placeholder="Enter a employee no."
            onChange={employeeNoChangeHandler}
            onBlur={employeeNoBlurHandler}
            value={enteredEmployeeNo}
            error={employeeNoInputHasError ? employeeNoErrorMessage : null}
          />
          <InputField
            type="text"
            id="firstName"
            name="firstName"
            labelName="First Name"
            placeholder="Enter a first name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={enteredFirstName}
            error={
              firstNameInputHasError ? "Please enter a valid first name." : null
            }
          />

          <InputField
            type="text"
            id="middleName"
            name="middleName"
            labelName="Middle Name"
            placeholder="Enter a middle name"
            onChange={middleNameChangeHandler}
            onBlur={middleNameBlurHandler}
            value={enteredMiddleName}
            error={
              middleNameInputHasError ? "Please enter a middle name." : null
            }
          />

          <InputField
            type="text"
            id="lastName"
            name="lastName"
            labelName="Last Name"
            placeholder="Enter a last name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName}
            error={lastNameInputHasError ? "Please enter a last name." : null}
          />

          <InputField
            type="text"
            id="extensionName"
            name="extensionName"
            labelName="Extension Name"
            placeholder="Enter a extension name"
            onChange={extensionNameChangeHandler}
            onBlur={extensionNameBlurHandler}
            value={enteredExtensionName}
            error={
              extensionNameInputHasError
                ? "Please enter a extension name."
                : null
            }
          />

          <DateField
            id="birthdate"
            name="birthdate"
            labelName="Birthdate"
            placeholder="Enter a birthdate"
            onChange={birthdateChangeHandler}
            onBlur={birthdateBlurHandler}
            value={enteredBirthdate}
            error={birthdateInputHasError ? "Please select a date." : null}
          />

          <DropdownField
            id="civilStatus"
            name="civilStatus"
            options={CIVIL_STATUS}
            labelName="Civil Status"
            onChange={civilStatusChangeHandler}
            onBlur={civilStatusBlurHandler}
            value={enteredCivilStatus}
            type="form"
            error={
              civilStatusInputHasError ? "Please select a civil status." : null
            }
          />

          <DropdownField
            id="sex"
            name="sex"
            labelName="Sex"
            options={GENDERS}
            onChange={sexChangeHandler}
            onBlur={sexBlurHandler}
            value={enteredSex}
            type="form"
            error={sexInputHasError ? "Please select a gender." : null}
          />

          <InputField
            type="text"
            id="houseNo"
            name="houseNo"
            labelName="House No."
            placeholder="Enter a house no."
            onChange={houseNoChangeHandler}
            onBlur={houseNoBlurHandler}
            value={enteredHouseNo}
            error={
              houseNoInputHasError ? "Please enter a valid house no.." : null
            }
          />

          <InputField
            type="text"
            id="street"
            name="street"
            labelName="Street"
            placeholder="Enter a street"
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
            value={enteredStreet}
            error={streetInputHasError ? "Please enter a valid street." : null}
          />

          <InputField
            type="text"
            id="subdivision"
            name="subdivision"
            labelName="Subdivision"
            placeholder="Enter a subdivision"
            onChange={subdivisionChangeHandler}
            onBlur={subdivisionBlurHandler}
            value={enteredSubdivision}
            error={
              subdivisionInputHasError
                ? "Please enter a valid subdivision."
                : null
            }
          />

          <InputField
            type="text"
            id="barangay"
            name="barangay"
            labelName="Barangay"
            placeholder="Enter a barangay"
            onChange={barangayChangeHandler}
            onBlur={barangayBlurHandler}
            value={enteredBarangay}
            error={
              barangayInputHasError ? "Please enter a valid barangay." : null
            }
          />

          <InputField
            type="text"
            id="municipality"
            name="municipality"
            labelName="Municipality"
            placeholder="Enter a municipality"
            onChange={municipalityChangeHandler}
            onBlur={municipalityBlurHandler}
            value={enteredMunicipality}
            error={
              municipalityInputHasError
                ? "Please enter a valid municipality."
                : null
            }
          />

          <InputField
            type="text"
            id="province"
            name="province"
            labelName="Province"
            placeholder="Enter a province"
            onChange={provinceChangeHandler}
            onBlur={provinceBlurHandler}
            value={enteredProvince}
            error={
              provinceInputHasError ? "Please enter a valid province." : null
            }
          />

          <InputField
            type="text"
            id="zipCode"
            name="zipCode"
            labelName="Zip Code"
            placeholder="Enter a zip code"
            onChange={zipCodeChangeHandler}
            onBlur={zipCodeBlurHandler}
            value={enteredZipCode}
            error={
              zipCodeInputHasError ? "Please enter a valid zip code." : null
            }
          />

          <InputField
            type="text"
            id="contactNo"
            name="contactNo"
            labelName="Contact No."
            placeholder="Enter a contact no."
            onChange={contactNoChangeHandler}
            onBlur={contactNoBlurHandler}
            value={enteredContactNo}
            error={
              contactNoInputHasError ? "Please enter a contact no.." : null
            }
          />

          <Button label="Sign Up" type="primary" />
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
