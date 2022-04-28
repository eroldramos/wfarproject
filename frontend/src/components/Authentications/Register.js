import React, { Fragment, useState } from "react";
import TextField from "../UI/FormControl/InputField/TextField";
import DateField from "../UI/FormControl/InputField/DateField";
import classes from "./Register.module.css";
import Button from "../UI/FormControl/Button/Button";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [extensionName, setExtensionName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [sex, setSex] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [subdivision, setSubdivision] = useState("");
  const [barangay, setBarangary] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");

  const setUsernameValue = (event) => {
    setUsername(event.target.value);
  };

  const setEmailValue = (event) => {
    setEmail(event.target.value);
  };

  const setPasswordValue = (event) => {
    setPassword(event.target.value);
  };
  const setConfirmPasswordValue = (event) => {
    setConfirmPassword(event.target.value);
  };
  const setFirstNameValue = (event) => {
    setFirstName(event.target.value);
  };
  const setMiddleNameValue = (event) => {
    setMiddleName(event.target.value);
  };
  const setLastNameValue = (event) => {
    setLastName(event.target.value);
  };
  const setExtensionnameValue = (event) => {
    setExtensionName(event.target.value);
  };
  const setBirthdateValue = (event) => {
    setBirthdate(event.target.value);
  };
  const setCivilStatusValue = (event) => {
    setCivilStatus(event.target.value);
  };
  const setSexValue = (event) => {
    setSex(event.target.value);
  };
  const setHouseNoValue = (event) => {
    setHouseNo(event.target.value);
  };
  const setStreetValue = (event) => {
    setStreet(event.target.value);
  };
  const setSubdivisionValue = (event) => {
    setSubdivision(event.target.value);
  };
  const setBarangayValue = (event) => {
    setBarangary(event.target.value);
  };
  const setMunicipalityValue = (event) => {
    setMunicipality(event.target.value);
  };
  const setProvinceValue = (event) => {
    setProvince(event.target.value);
  };
  const setZipCodeValue = (event) => {
    setZipCode(event.target.value);
  };
  const setContactNoValue = (event) => {
    setContactNo(event.target.value);
  };
  const setEmployeeNoValue = (event) => {
    setEmployeeNo(event.target.value);
  };
  const onRegisterHandler = (event) => {
    event.preventDefault(); // to prevent from sending request and from reloading the page
    console.log({
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      extensionName: extensionName,
      birthdate: birthdate,
      civilStatus: civilStatus,
      sex: sex,
      houseNo: houseNo,
      street: street,
      subdivision: subdivision,
      barangay: barangay,
      municipality: municipality,
      province: province,
      zipCode: zipCode,
      contactNo: contactNo,
      employeeNo: employeeNo,
    });
  };
  return (
    <Fragment>
      <div className={classes.container}>
        <form onSubmit={onRegisterHandler}>
          <h1 style={{ textAlign: "center" }}>Register Page</h1>
          <TextField
            id="username"
            name="username"
            labelName="Username"
            placeholder="Enter a username"
            onChange={setUsernameValue}
            value={username}
            error={null}
          />

          <TextField
            id="email"
            name="email"
            labelName="Email"
            placeholder="Enter an email"
            onChange={setEmailValue}
            value={email}
            error={null}
          />
          <TextField
            id="password"
            name="password"
            labelName="Password"
            placeholder="Enter a password"
            onChange={setPasswordValue}
            value={password}
            error={null}
          />

          <TextField
            id="confirmPassowrd"
            name="confirmPassword"
            labelName="Confirm Password"
            placeholder="Confirm password"
            onChange={setConfirmPasswordValue}
            value={confirmPassword}
            error={null}
          />

          <TextField
            id="firstName"
            name="firstName"
            labelName="First Name"
            placeholder="Enter a first name"
            onChange={setFirstNameValue}
            value={firstName}
            error={null}
          />

          <TextField
            id="middleName"
            name="middleName"
            labelName="Middle Name"
            placeholder="Enter a middle name"
            onChange={setMiddleNameValue}
            value={middleName}
            error={null}
          />

          <TextField
            id="lastName"
            name="lastName"
            labelName="Last Name"
            placeholder="Enter a last name"
            onChange={setLastNameValue}
            value={lastName}
            error={null}
          />

          <TextField
            id="extensionName"
            name="extensionName"
            labelName="Extension Name"
            placeholder="Enter a extension name"
            onChange={setExtensionnameValue}
            value={extensionName}
            error={null}
          />

          <DateField
            id="birthdate"
            name="birthdate"
            labelName="Birthdate"
            placeholder="Enter a birthdate"
            onChange={setBirthdateValue}
            value={birthdate}
            error={null}
          />

          <TextField
            id="civilStatus"
            name="civilStatus"
            labelName="Civil Status"
            placeholder="Enter a civil status"
            onChange={setCivilStatusValue}
            value={civilStatus}
            error={null}
          />

          <TextField
            id="sex"
            name="sex"
            labelName="Sex"
            placeholder="Enter a sex"
            onChange={setSexValue}
            value={sex}
            error={null}
          />

          <TextField
            id="houseNo"
            name="houseNo"
            labelName="House No."
            placeholder="Enter a house no."
            onChange={setHouseNoValue}
            value={houseNo}
            error={null}
          />

          <TextField
            id="street"
            name="street"
            labelName="Street"
            placeholder="Enter a street"
            onChange={setStreetValue}
            value={street}
            error={null}
          />

          <TextField
            id="subdivision"
            name="subdivision"
            labelName="Subdivistion"
            placeholder="Enter a subdivision"
            onChange={setSubdivisionValue}
            value={subdivision}
            error={null}
          />

          <TextField
            id="barangay"
            name="barangay"
            labelName="Barangay"
            placeholder="Enter a barangay"
            onChange={setBarangayValue}
            value={barangay}
            error={null}
          />

          <TextField
            id="municipality"
            name="municipality"
            labelName="Municipality"
            placeholder="Enter a municipality"
            onChange={setMunicipalityValue}
            value={municipality}
            error={null}
          />

          <TextField
            id="province"
            name="province"
            labelName="Province"
            placeholder="Enter a province"
            onChange={setProvinceValue}
            value={province}
            error={null}
          />

          <TextField
            id="zipCode"
            name="zipCode"
            labelName="Zip Code"
            placeholder="Enter a zip code"
            onChange={setZipCodeValue}
            value={zipCode}
            error={null}
          />

          <TextField
            id="contactNo"
            name="contactNo"
            labelName="Contact No."
            placeholder="Enter a contact no."
            onChange={setContactNoValue}
            value={contactNo}
            error={null}
          />

          <TextField
            id="empNo"
            name="empNo"
            labelName="Employee No."
            placeholder="Enter a employee no."
            onChange={setEmployeeNoValue}
            value={employeeNo}
            error={null}
          />
          <Button label="Sign Up" type="primary" />
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
