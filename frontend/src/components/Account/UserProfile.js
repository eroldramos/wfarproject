import styles from "./UserProfile.module.css"
import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SmallButton from "../UI/FormControl/Button/SmallButton"
import useValidateInput from "../../hooks/useValidateInput";
import Pic from "../Account/img/profpic.jpg";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from 'axios';
import Modal from "../UI/Modal/Modal";
import InputField from "../UI/FormControl/InputField/InputField";
import CustomDropdownField from "../UI/FormControl/DropdownField/CustomDropdownField";
import Button from "../UI/FormControl/Button/ModalButton";
const UserProfile = () =>{
    const CIVIL_STATUS = [
        { label: "Please Select Civil Status", value: "" },
        { label: "Married", value: 1 },
        { label: "Widowed ", value: 2 },
        { label: "Separated ", value: 3 },
        { label: "Divorced ", value: 4 },
        { label: "Single ", value: 5 },
    ];
    const [state, setState] = useState([])
  const loggedUser = useSelector((state) => state.login);
  const { userInfo } = loggedUser;

  useEffect(() => {
    const url = "/api/profile/" + userInfo.id;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setState(json);
        setprofile_pic(json[0].profile_picture)
        setCurrentPass(json[0].password);
        setEnteredFirstName(json[0].first_name);
        setEnteredMiddleName(json[0].middle_name);
        setEnteredLastName(json[0].last_name);
        setEnteredEmpNo(json[0].emp_no);
        setEnteredCivilStatus(json[0].civil_status);
        setEnteredHouseNo(json[0].house_no);
        setEnteredStreet(json[0].street);
        setEnteredSubdivision(json[0].subdivision);
        setEnteredBarangay(json[0].barangay);
        setEnteredMunicipality(json[0].municipality);
        setEnteredProvince(json[0].province);
        setEnteredZip(json[0].zip_code);
        setEnteredContactNo(json[0].contact_no);
        setEnteredEmail(json[0].email);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchData();
  }, []);


  const [currentPass, setCurrentPass] = useState('');
  const [isOpen, setIsopen] = useState(false)
  const onClose = () => {
    setIsopen(false)
  }

  const [passisOpen, passsetIsopen] = useState(false)
  const passonClose = () => {
    passsetIsopen(false)
  }

  const [pictureisOpen, picturesetIsopen] = useState(false)
  const pictureonClose = () => {
    picturesetIsopen(false)
  }

  // First Name Validations
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
    setEnteredValue: setEnteredFirstName,
  } = useValidateInput((value) => value !== "");

  // Middle Name Validations
  const {
    value: enteredMiddleName,
    isValid: enteredMiddleNameIsValid,
    hasError: middleNameInputHasError,
    valueChangeHandler: middleNameChangeHandler,
    inputBlurHandler: middleNameBlurHandler,
    reset: resetMiddleNameInput,
    setEnteredValue: setEnteredMiddleName,
  } = useValidateInput((value) => value !== "");

  // Last Name Validations
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
    setEnteredValue: setEnteredLastName,
  } = useValidateInput((value) => value !== "");

  // Employee No Validations
  const {
    value: enteredEmployeeNo,
    isValid: enteredEmployeeNoIsValid,
    hasError: employeeNoInputHasError,
    valueChangeHandler: employeeNoChangeHandler,
    inputBlurHandler: employeeNoBlurHandler,
    reset: resetEmployeeNoInput,
    setEnteredValue: setEnteredEmpNo,
  } = useValidateInput(
    (value) => value !== "" && onlyNumbers(value)
  );
  function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }
  let employeeNoErrorMessage = "";
  if (
    enteredEmployeeNo === "" ||
    !onlyNumbers(enteredEmployeeNo)
  ) {
    employeeNoErrorMessage = "Please enter a valid employee number.";
  }

  // Civil Status Validations
  const {
    value: enteredCivilStatus,
    isValid: enteredCivilStatusIsValid,
    hasError: civilStatusInputHasError,
    valueChangeHandler: civilStatusChangeHandler,
    inputBlurHandler: civilStatusBlurHandler,
    reset: resetCivilStatusInput,
    setEnteredValue: setEnteredCivilStatus,
  } = useValidateInput((value) => value !== "");

  // House No Validations
  const {
    value: enteredHouseNo,
    isValid: enteredHouseNoIsValid,
    hasError: houseNoInputHasError,
    valueChangeHandler: houseNoChangeHandler,
    inputBlurHandler: houseNoBlurHandler,
    reset: resetHouseNo,
    setEnteredValue: setEnteredHouseNo,
  } = useValidateInput(
    (value) => value !== "" && onlyNumbers(value)
  );

  // Street Validations
  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
    setEnteredValue: setEnteredStreet,
  } = useValidateInput((value) => value !== "");

  // Subdivision Validations
  const {
    value: enteredSubdivision,
    isValid: enteredSubdivisionIsValid,
    hasError: subdivisionInputHasError,
    valueChangeHandler: subdivisionChangeHandler,
    inputBlurHandler: subdivisionBlurHandler,
    reset: resetSubdivision,
    setEnteredValue: setEnteredSubdivision,
  } = useValidateInput((value) => value !== "");

  // Barangay Validations
  const {
    value: enteredBarangay,
    isValid: enteredBarangayIsValid,
    hasError: barangayInputHasError,
    valueChangeHandler: barangayChangeHandler,
    inputBlurHandler: barangayBlurHandler,
    reset: resetBarangay,
    setEnteredValue: setEnteredBarangay,
  } = useValidateInput((value) => value !== "");

  // Municipality Validations
  const {
    value: enteredMunicipality,
    isValid: enteredMunicipalityIsValid,
    hasError: municipalityInputHasError,
    valueChangeHandler: municipalityChangeHandler,
    inputBlurHandler: municipalityBlurHandler,
    reset: resetMunicipality,
    setEnteredValue: setEnteredMunicipality,
  } = useValidateInput((value) => value !== "");

  // Province Validations
  const {
    value: enteredProvince,
    isValid: enteredProvinceIsValid,
    hasError: provinceInputHasError,
    valueChangeHandler: provinceChangeHandler,
    inputBlurHandler: provinceBlurHandler,
    reset: resetProvince,
    setEnteredValue: setEnteredProvince,
  } = useValidateInput(
    (value) => value !== "");

  // Zip Code Validations
  const {
    value: enteredZipCode,
    isValid: enteredZipCodeIsValid,
    hasError: zipCodeInputHasError,
    valueChangeHandler: zipCodeChangeHandler,
    inputBlurHandler: zipCodeBlurHandler,
    reset: resetZipCode,
    setEnteredValue: setEnteredZip,
  } = useValidateInput(
    (value) => value !== "" && onlyNumbers(value)
  );

  // Contact No Validations
  const {
    value: enteredContactNo,
    isValid: enteredContactNoIsValid,
    hasError: contactNoInputHasError,
    valueChangeHandler: contactNoChangeHandler,
    inputBlurHandler: contactNoBlurHandler,
    reset: resetContactNo,
    setEnteredValue: setEnteredContactNo,
  } = useValidateInput(
    (value) => value !== "" && onlyNumbers(value)
  );

  //Email Validations
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
    setEnteredValue: setEnteredEmail,
  } = useValidateInput((value) => value.includes("@") && value !== "");

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
      value !== "" &&
      value.length > 8 &&
      containsNumber(value)
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
  if (!containsNumber(enteredPassword) && enteredPassword !== "") {
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
    (value) => value !== "" && value === enteredPassword
  );
  let confirmPasswordErrorMessage = "";
  if (
    enteredConfirmPassword !== enteredPassword ||
    enteredConfirmPassword === ""
  ) {
    confirmPasswordErrorMessage = "Password and confirm password do not match.";
  }

  //For Current password
  const {
    value: enteredCurrentPassword,
    isValid: enteredCurrentPasswordIsValid,
    hasError: CurrentPasswordInputHasError,
    valueChangeHandler: CurrentPasswordChangeHandler,
    inputBlurHandler: CurrentPasswordBlurHandler,
    reset: resetCurrentPassword,
  } = useValidateInput(
    (value) => value !== "");

  const onSubmit = () => {
    if (
      enteredFirstNameIsValid &&
      enteredMiddleNameIsValid &&
      enteredLastNameIsValid &&
      enteredEmployeeNoIsValid &&
      //enteredCivilStatusIsValid &&
      //enteredHouseNoIsValid &&
      //enteredStreetIsValid &&
      //enteredSubdivisionIsValid &&
      //enteredBarangayIsValid &&
      //enteredMunicipalityIsValid &&
      //enteredProvinceIsValid &&
      // enteredZipCodeIsValid &&
      enteredContactNoIsValid &&
      enteredEmailIsValid
    ) {
      let data = {
        first_name: enteredFirstName,
        middle_name: enteredMiddleName,
        last_name: enteredLastName,
        emp_no: enteredEmployeeNo,
        civil_status: enteredCivilStatus,
        house_no: enteredHouseNo,
        street: enteredStreet,
        subdivision: enteredSubdivision,
        barangay: enteredBarangay,
        municipality: enteredMunicipality,
        province: enteredProvince,
        zip_code: enteredZipCode,
        contact_no: enteredContactNo,
        email: enteredEmail,
      }
      Swal.fire({
        title: 'Success!',
        text: 'Changes has been saved',
        icon: 'success',
        confirmButtonText: 'OK', showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
      }).then((result) => {
        window.location.reload(false);
      });
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/profile/edit/' + userInfo.id + '/',
        data: data
      });
    }
  }

  const passonSubmit = () => {
    if (enteredPasswordIsValid &&
      enteredConfirmPasswordIsValid
    ) {
      if (enteredCurrentPassword === currentPass) {
        Swal.fire({
          title: 'Success!',
          text: 'Password has been updated',
          icon: 'success',
          confirmButtonText: 'OK', showConfirmButton: true,
          timer: 3000,
          timerProgressBar: true,
          allowOutsideClick: false,
        }).then((result) => {
          window.location.reload(false);
        });
        let data = {
          password: enteredPassword
        }
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/api/profile/edit-password/' + userInfo.id + '/',
          data: data
        });
      } else {
        Swal.fire({
          title: 'Incorrect Password',
          text: 'Please type your current password on the field provided',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  }

  const [profile_pic, setprofile_pic] = useState();

  const OpenProfileChange = () => {
    document.getElementById('input_file').click();
  }

  const HandleProfileChange = (evt) => {
    var picture = (evt.target.files[0]);
    var src = URL.createObjectURL(picture);
    setprofile_pic(src);

    var formData = new FormData();
    formData.append("profile_picture", evt.target.files[0]);
    axios.post('http://127.0.0.1:8000/api/profile/edit-picture/' + userInfo.id + '/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((result) => {
      window.location.reload(false);
    });


  }

    return (
        <div className={styles["container"]}>
            <div className={styles["horizontal-container"] + " " + styles["horizontal-container-1"]}>
                <h1>My Profile</h1>
                
                <div className={styles["user-image-detail-container"]}>
                    <div className={styles["image-container"]}>
                        <input id="input_file" type="file" onChange={(evt) => HandleProfileChange(evt)} accept={'image/*'} style={{ display: 'none' }} />
                        <img id="get_file" src={profile_pic == null ? Pic : profile_pic} alt="pic" onClick={() => OpenProfileChange()} />
                    </div>
                    <h3>Admin 123</h3>
                    <h3>Username</h3>
                </div>
            </div>
            <div className={styles["horizontal-container"] + " " + styles["horizontal-container-2"]}>
                <div className={styles["edit-buttons-container"]}>
                    <SmallButton
                        onClick={() => setIsopen(true)}
                        label="Edit Profile"
                        type="primary"
                        size="xs"/>
                    <SmallButton
                        onClick={() => passsetIsopen(true)}
                        label="Change Password"
                        type="primary"
                        size="xs"/>
                    {isOpen && <Modal onClose = {onClose} size = "m-long-height">
                        <div className={styles["modal-inner-container"]}>
                            <h3 className={styles["modal-header-text"]}>Edit Details</h3>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
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
                                    setEnteredValue=''
                                    error={
                                    civilStatusInputHasError
                                        ? "Please select a civil status."
                                        : null
                                    }
                                    size="l"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
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
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["button-field"]}>
                                <SmallButton
                                onClick={onSubmit}
                                label="Save"
                                type="primary"
                                size="s"/>
                                <Button
                                onClick={onClose}
                                label="Cancel"
                                type="cancel"
                                size="s" />
                            </div>
                        </div>
                    </Modal>}
                    {passisOpen && <Modal onClose={passonClose} size="m">
                        <div className={styles["modal-inner-container"]}>
                            <h3>Edit Password</h3>
                            <div className={styles["form-field"]}>
                                <InputField
                                    type="password"
                                    id="currentpassword"
                                    name="currentpassword"
                                    labelName="Current Password"
                                    placeholder="Enter your current password"
                                    onChange={CurrentPasswordChangeHandler}
                                    onBlur={CurrentPasswordBlurHandler}
                                    value={enteredCurrentPassword}
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
                                <InputField
                                    type="password"
                                    id="password"
                                    name="password"
                                    labelName="New Password"
                                    placeholder="Enter a password"
                                    onChange={passwordChangeHandler}
                                    onBlur={passwordBlurHandler}
                                    value={enteredPassword}
                                    error={passwordInputHasError ? passwordErrorMessage : null}
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["form-field"]}>
                                <InputField
                                    type="password"
                                    id="confirmPassowrd"
                                    name="confirmPassword"
                                    labelName="Confirm New Password"
                                    placeholder="Confirm password"
                                    onChange={confirmPasswordChangeHandler}
                                    onBlur={confirmPasswordBlurHandler}
                                    value={enteredConfirmPassword}
                                    error={
                                      confirmPasswordInputHasError ? confirmPasswordErrorMessage : null
                                    }
                                    size = "lg"
                                    custom="form-control-custom"
                                    labelMargin="nm"
                                />
                            </div>
                            <div className={styles["button-field"]}>
                                <SmallButton
                                onClick={passonSubmit}
                                label="Save"
                                type="primary"
                                size="s"/>
                                <Button
                                onClick={passonClose}
                                label="Cancel"
                                type="cancel"
                                size="s" />
                            </div>
                        </div>
                    </Modal>}
                </div>
                <div className={styles["personal-info-container"]}>
                    <h3>Personal Information</h3>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Name: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>{state.map((item) => item.name)}</p>
                        </div>
                    </div>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Sex: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>
                            {state.map((item) => {
                            if (item.sex === 1) {
                                return <p className="userinput" style={{ color: '#000000' }}> Male </p>
                            } else if (item.sex === 2) {
                                return <p className="userinput" style={{ color: '#000000' }}> Female </p>
                            } else if (item.sex === 3) {
                                return <p className="userinput" style={{ color: '#000000' }}> Others </p>
                            } else {
                                return <p className="userinput" style={{ color: '#000000' }}></p>
                            }
                            })}
                            </p>
                        </div>
                    </div>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Date of Birth: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>
                                {state.map((item) => {
                                let date = new Date(item.birthdate);
                                let month = date.toLocaleString('en-us', { month: 'long' });
                                return <p className="userinput" style={{ color: '#000000' }}> {month + ' ' + date.getDate() + ', ' + date.getFullYear()}</p>
                                })}
                            </p>
                        </div>
                    </div>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Civil Status: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>
                                {state.map((item) => {
                                if (item.civil_status === 1) {
                                    return <p className="userinput" style={{ color: '#000000' }}> Married </p>
                                } else if (item.civil_status === 2) {
                                    return <p className="userinput" style={{ color: '#000000' }}> Widow </p>
                                } else if (item.civil_status === 3) {
                                    return <p className="userinput" style={{ color: '#000000' }}> Separated </p>
                                } else if (item.civil_status === 4) {
                                    return <p className="userinput" style={{ color: '#000000' }}> Divorced </p>
                                } else if (item.civil_status === 5) {
                                    return <p className="userinput" style={{ color: '#000000' }}> Single </p>
                                }
                                else {
                                    return <p className="userinput" style={{ color: '#000000' }}> </p>
                                }
                                })}
                            </p>
                        </div>
                    </div>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Address: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>
                            {state.map((item) => item.house_no == null ? '' : (item.house_no + ' '))
                            }
                            {state.map((item) =>
                                item.street == null ? '' : (item.street + ' St., ')
                            )
                            }
                            {state.map((item) =>
                                item.subdivision == null ? '' : item.subdivision)
                            }
                            {state.map((item) =>
                                ' ' + item.barangay == null ? '' : (item.barangay + ', '))
                            }
                            {state.map((item) =>
                                item.municipality == null ? '' : (item.municipality + ', '))
                            }
                            {state.map((item) =>
                                item.province == null ? '' : (item.province))
                            }
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles["contact-info-container"]}>
                    <h3>Contact Information</h3>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Contact Number: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>{state.map((item) => item.contact_no)}</p>
                        </div>
                    </div>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Email Address: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p> {state.map((item) => item.email)}</p>
                        </div>
                    </div>
                </div>
                <div className={styles["Specialitation-info-container"]}>
                    <h3>Specialization</h3>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Program: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p> {state.map((item) => item.program == null ? 'none' : item.program)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserProfile;