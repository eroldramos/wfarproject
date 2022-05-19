import React, { Fragment, useState, useEffect } from "react";
import InputField from "../UI/FormControl/InputField/InputField";
import DateField from "../UI/FormControl/DateField/DateField";
import styles from "./CreateSemester.module.css";
import useValidateInput from "../../hooks/useValidateInput";
import Button from "../UI/FormControl/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createSem } from "../../store/manageSemActions";
import { useNavigate } from "react-router-dom";
import { createSemReset } from "../../store/manageSemActions";
import "./CreateSemester.css";
const CreateSemester = () => {
  const createSemReducerValues = useSelector((state) => state.createSem);
  const { success, error, isLoading } = createSemReducerValues;
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const icon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 17.3333H17.3334V24C17.3334 24.7333 16.7334 25.3333 16 25.3333C15.2667 25.3333 14.6667 24.7333 14.6667 24V17.3333H8.00002C7.26669 17.3333 6.66669 16.7333 6.66669 16C6.66669 15.2666 7.26669 14.6666 8.00002 14.6666H14.6667V7.99996C14.6667 7.26663 15.2667 6.66663 16 6.66663C16.7334 6.66663 17.3334 7.26663 17.3334 7.99996V14.6666H24C24.7334 14.6666 25.3334 15.2666 25.3334 16C25.3334 16.7333 24.7334 17.3333 24 17.3333Z"
        fill="#000"
      />
    </svg>
  );
  const {
    value: enteredLabel,
    isValid: enteredLabelIsValid,
    hasError: labelInputHasError,
    valueChangeHandler: labelChangeHandler,
    inputBlurHandler: labelBlurHandler,
    reset: resetLabel,
  } = useValidateInput((value) => value.trim() !== "");

  const {
    value: enteredSchoolYear,
    isValid: enteredSchoolYearIsValid,
    hasError: schoolYearInputHasError,
    valueChangeHandler: schoolYearChangeHandler,
    inputBlurHandler: schoolYearBlurHandler,
    reset: resetSchoolYear,
  } = useValidateInput((value) => value.trim() !== "");

  const {
    value: enteredStartDate,
    isValid: enteredStartDateIsValid,
    hasError: startDateInputHasError,
    valueChangeHandler: startDateChangeHandler,
    inputBlurHandler: startDateBlurHandler,
    reset: resetStartDate,
  } = useValidateInput((value) => value.trim() !== "");

  const {
    value: enteredEndDate,
    isValid: enteredEndDateIsValid,
    hasError: endDateInputHasError,
    valueChangeHandler: endDateChangeHandler,
    inputBlurHandler: endDateBlurHandler,
    reset: resetEndDate,
  } = useValidateInput((value) => value.trim() !== "");

  const submit = (e) => {
    e.preventDefault();
    let formErrors = 0;
    if (!enteredSchoolYearIsValid) {
      formErrors += 1;
    }
    if (!enteredSchoolYearIsValid) {
      formErrors += 1;
    }
    if (!enteredEndDateIsValid) {
      formErrors += 1;
    }
    if (!enteredStartDateIsValid) {
      formErrors += 1;
    }

    if (formErrors > 0) {
      alert("All fields are required!");
      return;
    }

    const obj = {
      label: enteredLabel,
      school_year: enteredSchoolYear,
      start_date: enteredStartDate,
      end_date: enteredEndDate,
    };
    dispatch(createSem(obj));
    console.log(obj);
  };
  const onCancelHandler = () => {
    navigate("/manage-semesters/");
  };

  const loggedUser = useSelector((state) => state.login);
  const { userInfo } = loggedUser;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      navigate("/manage-semesters/");
      dispatch(createSemReset());
    }
  }, [success]);
  return (
    <Fragment>
      <h1>Create New Semester</h1>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={submit}>
        <div className={styles["upper-form-container"]}>
          <InputField
            size="rg"
            type="text"
            id="Semester"
            name="Semester"
            labelName="Semester"
            placeholder="Ex. 1st Semester"
            onChange={labelChangeHandler}
            onBlur={labelBlurHandler}
            value={enteredLabel}
            error={labelInputHasError ? "Please enter a label" : null}
          />

          <InputField
            size="rg"
            type="text"
            id="schoolYear"
            name="schoolYear"
            labelName="School Year"
            placeholder="Ex. 2021-2022"
            onChange={schoolYearChangeHandler}
            onBlur={schoolYearBlurHandler}
            value={enteredSchoolYear}
            error={
              schoolYearInputHasError ? "Please enter a school year" : null
            }
          />
        </div>
        <div className="create-semester-container">
        <div className={styles["bottom-form-container"]}>
          <DateField
            size="rg"
            id="startDate"
            inputName="startDate"
            labelName={"Start Date"}
            onChange={startDateChangeHandler}
            onBlur={startDateBlurHandler}
            value={enteredStartDate}
            error={
              startDateInputHasError ? "Please select a start date." : null
            }
          />
          <DateField
            size="rg"
            id="endDate"
            inputName="endDate"
            labelName={"End Date"}
            onChange={endDateChangeHandler}
            onBlur={endDateBlurHandler}
            value={enteredEndDate}
            error={endDateInputHasError ? "Please select a end date." : null}
          />
        </div>
        </div>
        
        <div className={styles["button-container"]}>
          <Button
            label="Cancel"
            type="cancel"
            size="rg"
            onClick={onCancelHandler}
          />
          <Button label="Save" type="primary" size="rg" />
        </div>
      </form>
    </Fragment>
  );
};

export default CreateSemester;
