import React, { Fragment } from "react";
import styles from "./WFARSubmissionsOverview.module.css";
import SearchFaculty from "../SearchFaculty/SearchFaculty";
import SemesterFilter from "../SemesterFilter/SemesterFilter";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import WFAROverviewTable from "../Table/WFAROverviewTable/WFAROverviewTable";

const WFARSubmissionsOverview = () => {

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
        <div className={styles.searchFacultyContainer}>
          <SearchFaculty />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <WFAROverviewTable></WFAROverviewTable>
      </div>
      <div className={styles.footerContainer}>
        <Footer></Footer>
      </div>
    </Fragment>
  );
};

export default WFARSubmissionsOverview;
