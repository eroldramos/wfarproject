import React, { Fragment, useState, useEffect } from "react";
import InputField from "../UI/FormControl/InputField/InputField";
import DateField from "../UI/FormControl/DateField/DateField";
import styles from "./CreateSemester.module.css";
import useValidateInput from "../../hooks/useValidateInput";
import AddWeekRows from "./AddWeekRows";
import TransparentButton from "../UI/FormControl/Button/TransparentButton";
import Button from "../UI/FormControl/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createSem } from "../../store/manageSemActions";
import { useNavigate } from "react-router-dom";
import { createSemReset } from "../../store/manageSemActions";
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

  const [weekFormFields, setWeekFormFields] = useState([
    {
      label: "",
      startDate: "",
      endDate: "",
      labelTouch: false,
      startDateTouch: false,
      endDateTouch: false,
    },
  ]);

  const handleFormChange = (event, index) => {
    let data = [...weekFormFields];
    data[index][event.target.name] = event.target.value;
    setWeekFormFields(data);
  };

  const handleLabelTouch = (event, index) => {
    let data = [...weekFormFields];
    data[index]["labelTouch"] = true;
    setWeekFormFields(data);
  };

  const handleStartDateTouch = (event, index) => {
    let data = [...weekFormFields];
    data[index]["startDateTouch"] = true;
    setWeekFormFields(data);
  };

  const handleEndDateTouch = (event, index) => {
    let data = [...weekFormFields];
    data[index]["endDateTouch"] = true;
    setWeekFormFields(data);
  };

  const addFields = () => {
    let object = {
      label: "",
      startDate: "",
      endDate: "",
      labelTouch: false,
      startDateTouch: false,
      endDateTouch: false,
    };

    setWeekFormFields([...weekFormFields, object]);
  };

  const removeFields = (index) => {
    let data = [...weekFormFields];
    data.splice(index, 1);
    setWeekFormFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    let formErrors = 0;
    if (!enteredSchoolYearIsValid) {
      formErrors += 1;
    }
    if (!enteredSchoolYearIsValid) {
      formErrors += 1;
    }
    weekFormFields.map((field) => {
      if (
        field.startDate.length === 0 ||
        field.endDate.length === 0 ||
        field.label.length === 0
      ) {
        formErrors += 1;
      }
    });
    if (formErrors > 0) {
      alert("All fields are required!");
      return;
    }
    const obj = {
      label: enteredLabel,
      school_year: enteredSchoolYear,
      weeks: weekFormFields,
    };
    dispatch(createSem(obj));
  };
  const onCancelHandler = () => {
    navigate("/manage-semesters");
  };

  useEffect(() => {
    if (success) {
      navigate("/manage-semesters");
      dispatch(createSemReset());
    }
  }, [success]);
  return (
    <Fragment>
      <h1>Create New Semester</h1>
      {isLoading && <p>loading...</p>}
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={submit}>
        <div className={styles["upper-form-container"]}>
          <InputField
            size="rg"
            type="text"
            id="label"
            name="label"
            labelName="Label"
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
        <div className={styles["bottom-form-container"]}>
          <label>Add Weeks</label>
          {weekFormFields.map((form, index) => (
            <AddWeekRows
              key={index}
              onChange={(event) => handleFormChange(event, index)}
              handleLabelTouch={(event) => handleLabelTouch(event, index)}
              handleStartDateTouch={(event) =>
                handleStartDateTouch(event, index)
              }
              handleEndDateTouch={(event) => handleEndDateTouch(event, index)}
              onClick={() => removeFields(index)}
              label={form.label}
              startDate={form.startDate}
              endDate={form.endDate}
              labelTouch={form.labelTouch}
              startDateTouch={form.startDateTouch}
              endDateTouch={form.endDateTouch}
            />
          ))}

          <TransparentButton
            onClick={addFields}
            label="New Week"
            type="transparent"
            size="xs"
            svg={icon}
          />
        </div>
        <div className={styles["button-container"]}>
          <Button
            label="Cancel"
            type="cancel"
            size="xs"
            onClick={onCancelHandler}
          />
          <Button label="Save" type="primary" />
        </div>
      </form>
    </Fragment>
    // <div className="App">
    //   <form onSubmit={submit}>
    //     {weekFormFields.map((form, index) => {
    //       return (
    //         <div key={index}>
    //           <input
    //             name="label"
    //             placeholder="Name"
    //             onChange={(event) => handleFormChange(event, index)}
    //             value={form.label}
    //           />
    //           <input
    //             name="startDate"
    //             placeholder="Age"
    //             onChange={(event) => handleFormChange(event, index)}
    //             value={form.startDate}
    //           />
    //           <input
    //             name="endDate"
    //             placeholder="Age"
    //             onChange={(event) => handleFormChange(event, index)}
    //             value={form.endDate}
    //           />
    //           <button onClick={() => removeFields(index)}>Remove</button>
    //         </div>
    //       );
    //     })}
    //   </form>
    //   <button onClick={addFields}>Add More..</button>
    //   <br />
    //   <button onClick={submit}>Submit</button>
    // </div>
  );
};

export default CreateSemester;
