import React, { Fragment } from "react";
import styles from "./Overview.module.css";
import SemFilter from "../SemFilter/SemFilter";
import TableDisplay from "../TableDisplayCheckbox/TableDisplay";
import SearchFaculty from "../SearchFaculty/SearchFaculty";
import Table from "../Table/Table";
import ViewOptions from "../ViewOptions/ViewOptions"


const facultySubmission = () => {
  
  return (
    <Fragment>
      <div className={styles.mainConainter}>
        <h1>Weekly Faculty Accomplishment Reports</h1>
        <div style={{ width: "fit-content", float: "left" }}>
          <h3>Faculty Submissions</h3>
        </div>
        <ViewOptions/>
      </div>
      <div className={styles.secondarycontainer}>
        <div className={styles.semFilterContainer}>
          <SemFilter
            id="semester"
            name="semester"
            label="Semesters"
            labelName={"Semester"}
            size="rg"
            type="filter"
          />
        </div>
        <div className={styles.tableDisplayContainer}>
          <TableDisplay/>
        </div>
        <div className={styles.searchFacultyContainer}>
          <SearchFaculty/>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <Table></Table>
      </div>
    </Fragment>
  );
};

export default facultySubmission;
