import React, { Fragment } from "react";
import styles from "./WFARWeeklyView.module.css";
import SemesterFilter from "../SemesterFilter/SemesterFilter";
import SearchFaculty from "../SearchFaculty/SearchFaculty";
import WeeklyTable from "../Table/WFARWeeklyTable/WeeklyViewTable";
import WeekFilter from "./WeekFilter/WeekFilter";
import StatusFilter from "./StatusFilter/StatusFilter";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";

const WFARWeeklyView = () => {


  const semesters = useSelector((state) => state.wfarSemesters.semesters);

  return (
    <Fragment>
      <div className={styles.secondarycontainer}>
        <div className={styles.semFilterContainer}>
          <SemesterFilter
            id="semester"
            name="semester"
            labelName={"Semester"}
            onChange={null}
            options={semesters}
            size="rg"
            type="filter" />
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

export default WFARWeeklyView;
