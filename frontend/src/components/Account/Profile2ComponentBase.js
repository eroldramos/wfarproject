import React, { Fragment, useState } from "react";
import "../Account/Profile.css";
import Pic from "../Account/img/profpic.jpg";
import Swal from "sweetalert2/dist/sweetalert2.js";
import SmallButton from "../UI/FormControl/Button/SmallButton";
import Button from "../UI/FormControl/Button/Button";
import Modal from "../UI/Modal/Modal.js";
import InputField from "../UI/FormControl/InputField/InputField";
import useValidateInput from "../../hooks/useValidateInput";
import styled from 'styled-components';
import DropdownField from "../UI/FormControl/DropdownField/DropdownField";
import ImageCard from "../UI/FormControl/ImageCard/ImageCard";


const EDITBUTTON_WRAPPER_STYLES = {
  position: 'relative',
    top: '10%',
    zIndex: 1,
    left: '70%',
    
}

const CHANGEBUTTON_WRAPPER_STYLES = {
  position: 'relative',
    top: '10%',
    zIndex: 1,
    left: '70%',
    
}
const PICTUREBUTTON_WRAPPER_STYLES = {
  position: 'relative',
    top: '10%',
    zIndex: 1,
    left: '2%',
    
}
const ButtonGroup = styled.div`
  display: flex;
  float: right;
`
const CIVIL_STATUS = [
  { label: "--Please Select Civil Status--", value: "" },
  { label: "Married", value: "1" },
  { label: "Widowed ", value: "2" },
  { label: "Separated ", value: "3" },
  { label: "Divorced ", value: "4" },
  { label: "Single ", value: "5" },
];


const Profile = () => {
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

  // Civil Status Validations
  const {
    value: enteredCivilStatus,
    isValid: enteredCivilStatusIsValid,
    hasError: civilStatusInputHasError,
    valueChangeHandler: civilStatusChangeHandler,
    inputBlurHandler: civilStatusBlurHandler,
    reset: resetCivilStatusInput,
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

  const onSubmit = () => {
    if (enteredFirstNameIsValid && 
       enteredMiddleNameIsValid &&
       enteredLastNameIsValid &&
       enteredEmployeeNoIsValid &&
       enteredCivilStatusIsValid &&
       enteredHouseNoIsValid &&
       enteredStreetIsValid &&
       enteredSubdivisionIsValid &&
       enteredBarangayIsValid &&
       enteredMunicipalityIsValid &&
       enteredProvinceIsValid &&
       enteredZipCodeIsValid &&
       enteredContactNoIsValid &&
       enteredEmailIsValid &&
       enteredPasswordIsValid &&
      enteredConfirmPasswordIsValid
      ) {
      let data = {
        first_name : enteredFirstName,
        middle_name : enteredMiddleName,
        last_name : enteredLastName,
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
       password: enteredPassword

      }
      console.log(data)
    }
    
   
  }

  const passonSubmit = () => {
    if (enteredPasswordIsValid &&
      enteredConfirmPasswordIsValid
      ) {
      let data = {
       password: enteredPassword

      }
      console.log(data)
    }
    
   
  }
  return (
    <Fragment>
      <h1 className="HEADER">MY ACCOUNT</h1>
      <div className="container">
      <div style={EDITBUTTON_WRAPPER_STYLES}>
      <SmallButton
               onClick={() => setIsopen(true)}
               label="Edit Profile"
               type="primary"
               size="xs"></SmallButton>
               
               {isOpen && <Modal onClose={onClose} size = "r">
               <h1 className="MODAL_HEADER">Edit Details</h1>
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
            id="empNo"
            name="empNo"
            labelName="Employee No."
            placeholder="Enter a employee no."
            onChange={employeeNoChangeHandler}
            onBlur={employeeNoBlurHandler}
            value={enteredEmployeeNo}
            error={employeeNoInputHasError ? employeeNoErrorMessage : null}
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

          <ButtonGroup> 

          <Button
                onClick={onClose}
                        label="Cancel"
                        type="cancel"
                        size="rg" />
                        
            <SmallButton
                onClick={onSubmit}
                label="Save"
                type="primary"
                size="rg"></SmallButton>

          </ButtonGroup>
            
                       
          
                 </Modal>}
       </div>

       <div style={CHANGEBUTTON_WRAPPER_STYLES}>
       <SmallButton
               onClick={() => passsetIsopen(true)}
               label="Change Password"
               type="primary"
               size="xs"></SmallButton>
          
          {passisOpen && <Modal onClose={passonClose} size = "s">
               <h1 className="MODAL_HEADER">Change Password</h1>

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
          
          <ButtonGroup> 

          <Button
                onClick={passonClose}
                        label="Cancel"
                        type="cancel"
                        size="rg" />
                        
            <SmallButton
                onClick={onSubmit}
                label="Save"
                type="primary"
                size="rg"></SmallButton>

          </ButtonGroup>
            
               </Modal>}
               
        </div>

        <div className="profilepic" >
              <img className="pic" src={Pic} alt="pic" />
              <div style={PICTUREBUTTON_WRAPPER_STYLES}>
              <SmallButton
               onClick={() => picturesetIsopen(true)}
               label="Change Picture"
               type="primary"
               size="xs"></SmallButton>

              {pictureisOpen && <Modal onClose={pictureonClose} size="s">

            <h1 className="MODAL_HEADER">Change Profile Picture</h1>

            <div className="uploadpic">

         <ImageCard
          imageUrl={null}
          onClickAddImage={null}
          onRemoveImage={null}>
            
          </ImageCard>

            </div>


            <ButtonGroup> 

            <Button
                onClick={pictureonClose}
                        label="Cancel"
                        type="cancel"
                        size="rg" />

            <SmallButton
                onClick={onSubmit}
                label="Save"
                type="primary"
                size="rg"></SmallButton>

          </ButtonGroup>
        </Modal>}

        </div>

            </div>

        <form method="">
          <div className="row">
            <div className="col-md-6">
              <div className="Profile-head">
                <table className="adjustMarginsOfTable">
                  <tr>
                    <td colSpan="2">
                      <h1> Personal Data </h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Name
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Position
                      </p>
                    </td>
                    <td>{null}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Employee Number
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Sex
                      </p>
                    </td>
                    <td> {null}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Date of Birth
                      </p>
                    </td>
                    <td> {null}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Civil Status
                      </p>
                    </td>
                    <td> {null}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Address
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h1> Contact Information </h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Phone Number
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Email Address
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h1> Specialization </h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="Pdata" style={{ color: "#C0C0C0" }}>
                        Program
                      </p>
                    </td>
                    <td>
                      <p className="userinput" style={{ color: "#000000" }}></p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Profile;
