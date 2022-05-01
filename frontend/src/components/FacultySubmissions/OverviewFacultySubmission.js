import React, { Fragment } from "react";
import FilterButton from "../UI/FormControl/Button/FilterButton";
import styles from "./OverviewFacultySubmission.module.css";
import SemFilter from "./SemFilter";
import TableDisplay from "./TableDisplay"
import SearchFaculty from "./SearchFaculty";

const facultySubmission = () => {
  return (
    <Fragment>
      <div className={styles.mainConainter}>
        <h1>Weekly Faculty Accomplishment Reports</h1>
        <div style={{ width: "fit-content", float: "left" }}>
          <h3>Faculty Submissions</h3>
        </div>
        <div className={styles.filterBtnContainer}>
          <FilterButton label="Overview" type="primary"></FilterButton>
          <FilterButton label="Weekly View" type="primary"></FilterButton>
        </div>
      </div>
      <div className={styles.secondarycontainer}>
        <SemFilter
          id="semester"
          name="semester"
          label="Semesters"
          labelName={"Semester"}
          size="rg"
          type="filter"
        />
        <TableDisplay />
        <SearchFaculty/>
      </div>
    </Fragment>
  );
};

export default facultySubmission;
