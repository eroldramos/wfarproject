import React, { Fragment } from "react";
import DropdownField from "../UI/FormControl/DropdownField/DropdownField";
import Checkbox from "../UI/FormControl/Checkbox/Checkbox";
import styles from "./FacultySubmission.module.css";
import Button from "../UI/FormControl/Button/Button"
import SearchField from "../UI/FormControl/SearchField/SearchField"

const facultySubmission = () => {
  return (
    <Fragment>
      <div className={styles.mainContainer} >
        <h1 >Weekly Faculty Accomplishment Report</h1>

        <div className={styles.secondContainer}> 
            <h3>Faculty Submissions</h3>
            <div className={styles.spacer}></div>
            <div className={styles.ViewButtonsContainer}>
                <Button label = "Overview" type = "primary"/>
                <Button label = "Weekly View" type = "primary"/>
            </div>
        </div>

        <div className={styles.filterContainer}>
            <DropdownField
                style = {{ border: "1px solid black"}}
                id="semester"
                name="semester"
                labelName="Semesters"
                onChange = {null}
                options={[]}
            ></DropdownField>
            <Checkbox 
                id="dpUpComingWeeks"
                name="dpUpComingWeeks"
                label = "Table Display"
                labelName="Display Upcoming Weeks"
                onChange = {null}
            ></Checkbox>
        </div>
        <SearchField
                id="link"
                onChange={null}
                labelName="search"
                inputName="search"
                placeholder="Search faculty"
                size="rg"
                type="filter"
            ></SearchField>
      </div>
    </Fragment>
  );
};

export default facultySubmission;
