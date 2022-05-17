import React, { Fragment, useState, useEffect } from "react";
import styles from "./ManageSemesters.module.css";
import SemesterRows from "./SemesterRows";
import { useSelector, useDispatch } from "react-redux";
import { getSems } from "../../store/manageSemActions";
import Paginator from "./Paginator/Paginator";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"; //for routing
const DefaultPage = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const getSemsReducerValues = useSelector((state) => state.getSems);
  const [allSemesters, setAllSemesters] = useState([]);
  const {
    isLoading,
    error,
    semesters: { semList, page, pages },
  } = getSemsReducerValues;
  const archiveSemReducersValues = useSelector((state) => state.archiveSem);
  const { isLoading: archiveIsLoading } = archiveSemReducersValues;

  const activateSemReducersValues = useSelector((state) => state.activateSem);
  const { isLoading: activateIsLoading } = activateSemReducersValues;
  useEffect(() => {
    dispatch(getSems(search));
  }, [dispatch, search, archiveIsLoading, activateIsLoading]);
  useEffect(() => {
    if (semList) {
      setAllSemesters(semList);
    }
  }, [semList]);
  console.log(allSemesters);
  return (
    <Fragment>
      {allSemesters.map((sem, index) => (
        <SemesterRows
          key={index}
          semId={sem.id}
          label={sem.label}
          schoolYear={sem.school_year}
          isActive={sem.is_active}
        />
      ))}
      <div className={styles["paginator-container"]}>
        <Paginator page={page} pages={pages} url="/manage-semesters/" />
      </div>
    </Fragment>
  );
};

export default DefaultPage;
