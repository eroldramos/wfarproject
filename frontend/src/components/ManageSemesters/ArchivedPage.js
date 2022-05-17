import React, { Fragment, useState, useEffect } from "react";
import styles from "./ManageSemesters.module.css";
import ArchivedSemesterRows from "./ArchivedSemesterRows";
import { useSelector, useDispatch } from "react-redux";
import { getArchivedSems } from "../../store/manageSemActions";
import Paginator from "./Paginator/Paginator";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"; //for routing
const ArchivedPage = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const getArchivedSemsReducerValues = useSelector(
    (state) => state.getArchivedSems
  );
  const [allSemesters, setAllSemesters] = useState([]);
  const {
    isLoading,
    error,
    semesters: { semList, page, pages },
  } = getArchivedSemsReducerValues;

  const restoreSemReducerValues = useSelector((state) => state.restoreSem);
  const { isLoading: restoreIsLoading } = restoreSemReducerValues;

  useEffect(() => {
    dispatch(getArchivedSems(search));
  }, [dispatch, search, restoreIsLoading]);
  useEffect(() => {
    if (semList) {
      setAllSemesters(semList);
    }
  }, [semList]);
  console.log(allSemesters);
  return (
    <Fragment>
      {allSemesters.map((sem, index) => (
        <ArchivedSemesterRows
          key={index}
          semId={sem.id}
          label={sem.label}
          schoolYear={sem.school_year}
          isActive={sem.is_active}
        />
      ))}
      <div className={styles["paginator-container"]}>
        <Paginator
          page={page}
          pages={pages}
          url="/manage-semesters/archives/"
        />
      </div>
    </Fragment>
  );
};

export default ArchivedPage;
