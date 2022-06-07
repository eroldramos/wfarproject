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
  const SEX = [
    { label: "Sex", value: "" },
    { label: "Male", value: 1 },
    { label: "Female ", value: 2 },
    { label: "Others ", value: 3 },
  ];
  const [state, setState] = useState([]);
  const [emails, setEmails] = useState([]);
  const [emailDuplicate, setEmailDuplicate] = useState(false);
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
        setEnteredSex(json[0].sex);
        setEnteredHouseNo(json[0].house_no);
        setEnteredStreet(json[0].street);
        setEnteredSubdivision(json[0].subdivision);
        setEnteredBarangay(json[0].barangay);
        setEnteredMunicipality(json[0].municipality);
        setEnteredProvince(json[0].province);
        setEnteredZip(json[0].zip_code);
        setEnteredContactNo(json[0].contact_no);
        setEnteredEmail(json[0].email);
        setEnteredSpecialization(json[0].specialization);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    axios.get('http://127.0.0.1:8000/api/profile/get-email/' + userInfo.id + '/', {}, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (result) {
      setEmails(result.data);
    });

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
      confirmButtonText: 'OK',
      showConfirmButton: true,
      showCancelButton: true,
      input: 'password',
      confirmButtonColor: '#B16047',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        //delete
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/api/profile/delete-account/' + userInfo.id + '/',
          data: { password: login },
        }).then(function () {
          Swal.fire({
            title: 'Account Deleted',
            text: 'You will now be redirected to the login page',
            icon: 'success',
            confirmButtonColor: '#B16047',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
          }).then(function () {
            dispatch(logout());
            navigate('/');
          });
        }).catch(function (err) {
          Swal.fire({
            title: 'Password incorrect',
            text: 'Please type your password to delete your account',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#B16047',
          });
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
    (value) => value !== ""
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

  // Sex Validations
  const {
    value: enteredSex,
    isValid: enteredSexIsValid,
    hasError: sexInputHasError,
    valueChangeHandler: sexChangeHandler,
    inputBlurHandler: sexBlurHandler,
    reset: resetSexInput,
    setEnteredValue: setEnteredSex,
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

  // Specialization Validations
  const {
    value: enteredSpecialization,
    isValid: enteredSpecializationIsValid,
    hasError: zSpecializationInputHasError,
    valueChangeHandler: SpecializationChangeHandler,
    inputBlurHandler: SpecializationBlurHandler,
    reset: resetSpecialization,
    setEnteredValue: setEnteredSpecialization,
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
      setEmailDuplicate(false);
      for (const email in emails) {
        if (enteredEmail === emails[email]) {
          Swal.fire({
            title: 'Invalid Email',
            text: 'This email address is already used in another account.',
            icon: 'error',
            confirmButtonColor: '#B16047',
            confirmButtonText: 'OK',
            showConfirmButton: true,
          }).then(function () {
            setEmailDuplicate(true);
            setIsopen(true);
          });
        }
      }

      if (!emailDuplicate) {
        let data = {
          first_name: enteredFirstName,
          middle_name: enteredMiddleName,
          last_name: enteredLastName,
          emp_no: enteredEmployeeNo,
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
          email: enteredEmail,
          specialization: enteredSpecialization,
        }
        axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/api/profile/edit/' + userInfo.id + '/',
          data: data
        }).then(function () {
          Swal.fire({
            title: 'Success!',
            text: 'Changes has been saved',
            icon: 'success',
            confirmButtonText: 'OK',
            showConfirmButton: true,
            confirmButtonColor: '#B16047',
            timer: 3000,
            timerProgressBar: true,
          }).then((result) => {
            window.location.reload(false);
          });
        }).catch(function () {
          setIsopen(false);
        });
      }
    }
  }

  const passonSubmit = () => {
    if (enteredPasswordIsValid &&
      enteredConfirmPasswordIsValid
    ) {
      let data = {
        current: enteredCurrentPassword,
        password: enteredPassword,
      }
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/profile/edit-password/' + userInfo.id + '/',
        data: data
      }).then(function () {
        Swal.fire({
          title: 'Success!',
          text: 'Password has been updated',
          icon: 'success',
          confirmButtonColor: '#B16047',
          confirmButtonText: 'OK', showConfirmButton: true,
          timer: 3000,
          timerProgressBar: true,
          allowOutsideClick: false,
        }).then(function () {
          window.location.reload(false);
        });
      }).catch(function () {
        Swal.fire({
          title: 'Incorrect Password',
          text: 'Please type your current password on the field provided',
          icon: 'error',
          confirmButtonColor: '#B16047',
          confirmButtonText: 'OK',
          showConfirmButton: true,
        });
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
      confirmButtonText: 'Edit', confirmButtonColor: '#B16047',
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
              <img id="get_file" src={profile_pic == null ? Pic : profile_pic} alt="pic" onClick={() => OpenProfileChange()} />
            </div>
          </div>
          <div className={styles["name-container"]}>
            <h3>{state.map((item) => item.name)}</h3>
            <p>    {state.map((item) => {
              if (item.user_type === 1) {
                if (item.is_superuser) {
                  return <p className="userinput" style={{ color: '#000000' }}> Admin </p>
                }
                return <p className="userinput" style={{ color: '#000000' }}> Faculty </p>
              } else if (item.user_type === 2) {
                return <p className="userinput" style={{ color: '#000000' }}> Area Chair </p>
              } else if (item.user_type === 3) {
                return <p className="userinput" style={{ color: '#000000' }}> Department Head </p>
              } else {
                return <p className="userinput" style={{ color: '#000000' }}>n/a</p>
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
            {state.map((item) => {
              if (item.is_superuser === true) {
                return ''
              } else {
                return <SmallButton
                  onClick={() => constaccountDeleteSwal()}
                  label="Delete account"
                  type="primary"
                  size="c-s" />
              }
            })}

          </div>
          {isOpen && <Modal onClose={onClose} size="m-long-height">
            <div className={styles["modal-inner-container"]}>
              <h3 className={styles["modal-header-text"]}>Edit Profile</h3>
              <p className={styles["modal-desc-text"]}>Fill out the required fields</p>
              <div className={styles["input-field-scrollable"]}>
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    custom="custom-dropdown"
                  />
                </div>
                <div className={styles["form-field"]}>
                  <CustomDropdownField
                    id="sex"
                    name="sex"
                    labelName="Sex"
                    onChange={sexChangeHandler}
                    onBlur={sexBlurHandler}
                    value={enteredSex}
                    options={SEX}
                    type="form"
                    setEnteredValue=''
                    error={
                      sexInputHasError
                        ? "Sex"
                        : null
                    }
                    size="l"
                    custom="custom-dropdown"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    error={emailInputHasError ? 'Specialization cannot be empty' : null}
                    size="lg"
                    custom="edit-profile-form-control"
                    labelMargin="nm"
                  />
                </div>
                <div className={styles["form-field"]}>
                  <InputField
                    type="text"
                    id="specialization"
                    name="specialization"
                    labelName="Department"
                    placeholder="Enter your Department"
                    onChange={SpecializationChangeHandler}
                    onBlur={SpecializationChangeHandler}
                    value={enteredSpecialization}
                    error={zSpecializationInputHasError ? emailErrorMessage : null}
                    size="lg"
                    custom="edit-profile-form-control"
                    labelMargin="nm"
                  />
                </div>
                <div className={styles["button-field"]}>
                  <SmallButton
                    onClick={onSubmit}
                    label="Save"
                    type="primary"
                    size="s" />
                  <Button
                    onClick={onClose}
                    label="Cancel"
                    type="cancel"
                    size="s" />
                </div>
              </div>
            </div>
          </Modal>}
          {passisOpen && <Modal onClose={passonClose} size="m">
            <div className={styles["modal-inner-container"]}>
              <h3 className={styles["modal-header-text"]}>Change Password</h3>
              <p className={styles["modal-desc-text"]}>Fill out the required fields </p>
              <div className={styles["input-field-scrollable"]}>
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
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
                    size="lg"
                    custom="edit-profile-form-control"
                    labelMargin="nm"
                  />
                </div>
                <div className={styles["button-field"]}>
                  <SmallButton
                    onClick={passonSubmit}
                    label="Save"
                    type="primary"
                    size="s" />
                  <Button
                    onClick={passonClose}
                    label="Cancel"
                    type="cancel"
                    size="s" />
                </div>
              </div>
            </div>
          </Modal>}
          <div className={styles["user-details-container"]}>
            <div className={styles["scrollable-area"]}>
              <h3 className={styles["section-text"]}>Personal Information</h3>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Employee Number: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <p className={styles["info-text"]}>{state.map((item) => item.emp_no ? item.emp_no : 'n/a')}</p>
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
                        return 'Male'
                      } else if (item.sex === 2) {
                        return 'Female'
                      } else if (item.sex === 3) {
                        return 'Others'
                      } else {
                        return 'n/a'
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
                      return <p className={styles["info-text"]}> n/a </p>
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
                  <p className={styles["info-text"]}>{state.map((item) => item.email ? item.email : 'n/a')}</p>
                </div>
              </div>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Contact Number: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <p className={styles["info-text"]}>{state.map((item) => item.contact_no ? item.contact_no : 'n/a')}</p>
                </div>
              </div>
              <h3 className={styles["section-text"]}>Employee Information</h3>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>Department: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <p className={styles["info-text"]}>{state.map((item) => item.specialization ? item.specialization : 'n/a')}</p>
                </div>
              </div>
              <h3 className={styles["section-text"]}>Signature</h3>
              <div className={styles["user-info-container"]}>
                <div className={styles["details-placeholder"]}>
                  <p>File: </p>
                </div>
                <div className={styles["details-placeholder"]}>
                  <input id="input_file2" type="file" onChange={(evt) => HandleSignatureChange(evt)} accept={'image/*'} style={{ display: 'none' }} />
                  {/* <p className={styles["info-text"] + " " + styles["signature-info-text"]}>
                  
                  </p> */}
                  {
                    state.map((item) => {
                      if (signature == null) {
                        return <p id={styles["UploadSignature"]} onClick={() => OpenSignatureChange()}>none (click here to upload)</p>
                      }
                      else {
                        return <p id={styles["UploadSignature"]} onClick={() => openSignature(true)}>click here to view</p>
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