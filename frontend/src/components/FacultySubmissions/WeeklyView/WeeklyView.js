import React, { Fragment } from "react";
import styles from "./WeeklyView.module.css";
import SemFilter from "../SemFilter/SemFilter";
import TableDisplay from "../TableDisplayCheckbox/TableDisplay";
import SearchFaculty from "../SearchFaculty/SearchFaculty";
import WeeklyTable from "../Table/WeeklyViewTable";
import ViewOptions from "../ViewOptions/ViewOptions";
import WeekFilter from "./WeekFilter/WeekFilter";
import StatusFilter from "./StatusFilter/StatusFilter";
import Footer from "../Footer/Footer";


const facultySubmission = () => {
  return (
    <Fragment>
      <div className={styles.mainConainter}>
        <h1>Weekly Faculty Accomplishment Reports</h1>
        <div style={{ width: "fit-content", float: "left" }}>
          <h3>Faculty Submissions</h3>
        </div>
        <ViewOptions />
      </div>
      <div className={styles.secondarycontainer}>
        <div className={styles.semFilterContainer}>
          <SemFilter
            id="semFilter"
            name="semester"
            label="Semesters"
            labelName={"Semester"}
            size="rg"
            type="filter"
          />
        </div>
        <div className={styles.weekFilterContainer}>
          <WeekFilter
            id="weekFilter"
            name="weekFilter"
            label="Week"
            labelName={"Week"}
            size="rg"
            type="filter"
          />
        </div>
        <div className={styles.statusFilterContainer}>
          <StatusFilter
            id="statusFilter"
            name="statusFilter"
            label="Status"
            labelName={"Status"}
            size="rg"
            type="filter"
          />
        </div>
        <div className={styles.searchFilterContainer}>
          <SearchFaculty/>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <WeeklyTable></WeeklyTable>
      </div>
      <div className={styles.footerContainer}>
        <Footer></Footer>
      </div>
    </Fragment>
  );
};

export default facultySubmission;
