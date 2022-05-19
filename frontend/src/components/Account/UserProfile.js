import styles from "./UserProfile.module.css"
import React, { Fragment, useState, useEffect } from "react";
import SmallButton from "../UI/FormControl/Button/SmallButton"
import useValidateInput from "../../hooks/useValidateInput";

const UserProfile = () =>{

    const [state, setState] = useState([])
    useEffect(() => {
      const url = "/api/profile/";
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
          setEnteredCivilStatus(2);
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
    } = useValidateInput((value) => value.trim() !== "");
  
    // Middle Name Validations
    const {
      value: enteredMiddleName,
      isValid: enteredMiddleNameIsValid,
      hasError: middleNameInputHasError,
      valueChangeHandler: middleNameChangeHandler,
      inputBlurHandler: middleNameBlurHandler,
      reset: resetMiddleNameInput,
      setEnteredValue: setEnteredMiddleName,
    } = useValidateInput((value) => value.trim() !== "");
  
    // Last Name Validations
    const {
      value: enteredLastName,
      isValid: enteredLastNameIsValid,
      hasError: lastNameInputHasError,
      valueChangeHandler: lastNameChangeHandler,
      inputBlurHandler: lastNameBlurHandler,
      reset: resetLastNameInput,
      setEnteredValue: setEnteredLastName,
    } = useValidateInput((value) => value.trim() !== "");
  
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
      (value) => value.trim() !== "" && onlyNumbers(value.trim())
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
          url: 'http://127.0.0.1:8000/api/profile/edit/',
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
            url: 'http://127.0.0.1:8000/api/profile/edit-password/',
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
      axios.post('http://127.0.0.1:8000/api/profile/edit-picture/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  
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
                        //onClick={() => setIsopen(true)}
                        label="Edit Profile"
                        type="primary"
                        size="xs"/>
                    <SmallButton
                        //onClick={() => passsetIsopen(true)}
                        label="Change Password"
                        type="primary"
                        size="xs"/>
                </div>
                <div className={styles["personal-info-container"]}>
                    <h3>Personal Information</h3>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Name: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>Marvin Villamar</p>
                        </div>
                    </div>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Sex: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>Marvin Villamar</p>
                        </div>
                    </div>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Date of Birth: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>Marvin Villamar</p>
                        </div>
                    </div>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Civil Status: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>Marvin Villamar</p>
                        </div>
                    </div>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Address: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>Marvin Villamar</p>
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
                            <p>Marvin Villamar</p>
                        </div>
                    </div>
                    <div className={styles["user-details-container"]}>
                        <div className={styles["details-placeholder"]}>
                            <p>Email Address: </p>
                        </div>
                        <div className={styles["details-placeholder"]}>
                            <p>Marvin Villamar</p>
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
                            <p>Marvin Villamar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserProfile;