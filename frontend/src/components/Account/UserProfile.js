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
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { logout } from "../../store/authActions";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        setSignature(json[0].signature)
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
  const [isOpenSignature, setIsOpenSignature] = useState(false);
  const [isOpen, setIsopen] = useState(false)
  const onClose = () => {
    setIsopen(false)
  };
  const constaccountDeleteSwal = () => {
    Swal.fire({
      title: 'Delete your Account?',
      text: 'Enter your password to delete the account',
      icon: 'warning',
      confirmButtonText: 'OK', showConfirmButton: true,
      input: 'password',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        //delete
        Swal.fire({
          title: 'Account Delete',
          text: 'You will now be redirected to the login page',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000,
          timerProgressBar: true,
        }).then((result) => {
          axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/profile/delete-account/' + userInfo.id + '/',
            data: {}
          });
          dispatch(logout());
          navigate('/');
        });
      },
    });
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
    setEnteredValue: setEnteredPassword
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
    }
  }

  const [profile_pic, setprofile_pic] = useState();
  const [signature, setSignature] = useState();

  const OpenProfileChange = () => {
    document.getElementById('input_file').click();
  }

  const openSignature = () => {
    Swal.fire({
      imageUrl: signature,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showCancelButton: true,
      confirmButtonText: 'Edit',
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById('input_file2').click();
      }
    })
  }

  const OpenSignatureChange = () => {
    document.getElementById('input_file2').click();
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
    });
    window.location.reload(false);
  }

  const HandleSignatureChange = (evt) => {
    var picture = (evt.target.files[0]);
    var src = URL.createObjectURL(picture);
    setSignature(src);

    var formData = new FormData();
    formData.append("signature", evt.target.files[0]);
    axios.post('http://127.0.0.1:8000/api/profile/upload-signature/' + userInfo.id + '/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    window.location.reload(false);
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["header-container"]}>
        <h1>My Profile</h1>
      </div>
      <div className={styles["body-container"]}>
        <div className={styles["dp-container"]}>
          <div className={styles["image-container"]}>
            <div className={styles["image-bg-container"]}>
              <input id="input_file" type="file" onChange={(evt) => HandleProfileChange(evt)} accept={'image/*'} style={{ display: 'none' }} />
              <img id="get_file" style={{ borderRadius: '50%' }} src={profile_pic == null ? Pic : profile_pic} alt="pic" onClick={() => OpenProfileChange()} />
            </div>
          </div>
          <div className={styles["name-container"]}>
            <h3>{state.map((item) => item.name)}</h3>
            <p>    {state.map((item) => {
              if (item.user_type === 1) {
                return <p className="userinput" style={{ color: '#000000' }}> Faculty </p>
              } else if (item.sex === 2) {
                return <p className="userinput" style={{ color: '#000000' }}> Area Chair </p>
              } else if (item.sex === 3) {
                return <p className="userinput" style={{ color: '#000000' }}> Department Head </p>
              } else {
                return <p className="userinput" style={{ color: '#000000' }}></p>
              }
            })}</p>
          </div>
        </div>
        <div className={styles["details-container"]}>
          <div className={styles["edit-buttons-container"]}>
            <SmallButton
              onClick={() => setIsopen(true)}
              label="Edit Profile"
              type="primary"
              size="c-s" />
            <SmallButton
              onClick={() => passsetIsopen(true)}
              label="Change Password"
              type="primary"
              size="c-s" />
            <SmallButton
              onClick={() => constaccountDeleteSwal()}
              label="Delete account"
              type="primary"
              size="c-s" />
          </div>
          <div className={styles["user-details-container"]}>
            <div className={styles["scrollable-area"]}>
              <h3 className={styles["section-text"]}>Personal Information</h3>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Employee Number: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <p className={styles["info-text"]}>{state.map((item) => item.emp_no)}</p>
                </div>
              </div>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Username: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <p className={styles["info-text"]}>{state.map((item) => item.username)}</p>
                </div>
              </div>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Birthday: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  {state.map((item) => {
                    let date = new Date(item.birthdate);
                    let month = date.toLocaleString('en-us', { month: 'long' });
                    return <p className={styles["info-text"]}> {month + ' ' + date.getDate() + ', ' + date.getFullYear()}</p>
                  })}
                </div>
              </div>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Address: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <p className={styles["info-text"]}>
                    {state.map((item) => item.house_no == null ? '' : (item.house_no + ' '))
                    }
                    {state.map((item) =>
                      item.street == null ? '' : (item.street + ' St., ')
                    )
                    }
                    {state.map((item) =>
                      item.subdivision == null ? '' : item.subdivision + ' ')
                    }
                    {state.map((item) =>
                      item.barangay == null ? '' : (item.barangay + ', '))
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
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Sex: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <p className={styles["info-text"]}>
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
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Civil Status: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  {state.map((item) => {
                    if (item.civil_status === 1) {
                      return <p className={styles["info-text"]}> Married </p>
                    } else if (item.civil_status === 2) {
                      return <p className={styles["info-text"]}> Widow </p>
                    } else if (item.civil_status === 3) {
                      return <p className={styles["info-text"]}> Separated </p>
                    } else if (item.civil_status === 4) {
                      return <p className={styles["info-text"]}> Divorced </p>
                    } else if (item.civil_status === 5) {
                      return <p className={styles["info-text"]}> Single </p>
                    }
                    else {
                      return <p className={styles["info-text"]}> </p>
                    }
                  })}
                </div>
              </div>

              <h3 className={styles["section-text"]}>Contact Information</h3>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Email Address: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <p className={styles["info-text"]}>{state.map((item) => item.email)}</p>
                </div>
              </div>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Contact Number: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <p className={styles["info-text"]}>{state.map((item) => item.contact_no)}</p>
                </div>
              </div>
              <h3 className={styles["section-text"]}>Specialization</h3>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Program: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <p className={styles["info-text"]}>Sample</p>
                </div>
              </div>
              <h3 className={styles["section-text"]}>Signature</h3>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>File: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <input id="input_file2" type="file" onChange={(evt) => HandleSignatureChange(evt)} accept={'image/*'} style={{ display: 'none' }} />
                  {
                    state.map((item) => {
                      if (signature == null) {
                        return <p id="UploadSignature" onClick={() => OpenSignatureChange()}>none (click here to upload)</p>
                      }
                      else {
                        return <p id="UploadSignature" onClick={() => openSignature(true)}>click here to view</p>
                      }
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserProfile;