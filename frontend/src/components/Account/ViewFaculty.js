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
    const fetchViewDetails = (id) => {
        const url = "/api/profile/" + id;
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json1 = await response.json();
                setState(json1);
                setprofile_pic(json1[0].profile_picture)
                setEnteredFirstName(json1[0].first_name);
                setEnteredMiddleName(json1[0].middle_name);
                setEnteredLastName(json1[0].last_name);
                setEnteredEmpNo(json1[0].emp_no);
                setEnteredCivilStatus(json1[0].civil_status);
                setEnteredHouseNo(json1[0].house_no);
                setEnteredStreet(json1[0].street);
                setEnteredSubdivision(json1[0].subdivision);
                setEnteredBarangay(json1[0].barangay);
                setEnteredMunicipality(json1[0].municipality);
                setEnteredProvince(json1[0].province);
                setEnteredZip(json1[0].zip_code);
                setEnteredContactNo(json1[0].contact_no);
                setEnteredEmail(json1[0].email);
            } catch (error) {
                console.log("error: ", error);
            }
        }
        fetchData();
    }

    useEffect(() => {
        const url = "/api/profile/" + userInfo.id;
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setState(json);
                fetchViewDetails(json[0].view_id);
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchData();
    }, []);

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
                confirmButtonText: 'OK',
                showConfirmButton: true,
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
    const [viewing_id, setviewing_id] = useState();
    const [signature, setSignature] = useState();

    return (
        <div className={styles["container"]}>
            <div className={styles["header-container"]}>
                <h1>View Profile</h1>
            </div>
            <div className={styles["body-container"]}>
                <div className={styles["dp-container"]}>
                    <div className={styles["image-container"]}>
                        <div className={styles["image-bg-container"]}>
                            <img id="get_file" src={profile_pic == null ? Pic : profile_pic} alt="pic" />
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
                                return <p className="userinput" style={{ color: '#000000' }}></p>
                            }
                        })}</p>
                    </div>
                </div>
                <div className={styles["details-container"]}>
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
                                                return ''
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
                            <h3 className={styles["section-text"]}>Employee Information</h3>
                            <div className={styles["user-info-container"]}>
                                <div className={styles["details-placeholder"]}>
                                    <p>Department: </p>
                                </div>
                                <div className={styles["details-placeholder"]}>
                                    <p className={styles["info-text"]}>{state.map((item) => item.specialization)}</p>
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