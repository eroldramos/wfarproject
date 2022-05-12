import React, { Fragment, useState, useEffect } from "react";
import styles from "./ManageSemesters.module.css";
import IconButton from "../UI/FormControl/Button/IconButton";
import SemesterRows from "./SemesterRows";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSems } from "../../store/manageSemActions";
import Paginator from "./Paginator/Paginator";
const ManageSemesters = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useLocation().search;
  const icon = (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 17.3333H17.3334V24C17.3334 24.7333 16.7334 25.3333 16 25.3333C15.2667 25.3333 14.6667 24.7333 14.6667 24V17.3333H8.00002C7.26669 17.3333 6.66669 16.7333 6.66669 16C6.66669 15.2666 7.26669 14.6666 8.00002 14.6666H14.6667V7.99996C14.6667 7.26663 15.2667 6.66663 16 6.66663C16.7334 6.66663 17.3334 7.26663 17.3334 7.99996V14.6666H24C24.7334 14.6666 25.3334 15.2666 25.3334 16C25.3334 16.7333 24.7334 17.3333 24 17.3333Z"
        fill="#fff"
      />
    </svg>
  );

  const SEMESTERS = [
    { label: "1st Semester", schoolYear: "2021-2022" },
    { label: "1st Semester", schoolYear: "2021-2022" },
    { label: "1st Semester", schoolYear: "2021-2022" },
  ];

  const onNavigateCreateSemester = () => {
    navigate("/create-semester");
  };
  const getSemsReducerValues = useSelector((state) => state.getSems);
  const [allSemesters, setAllSemesters] = useState([]);
  const {
    isLoading,
    error,
    semesters: { semList, page, pages },
  } = getSemsReducerValues;
  useEffect(() => {
    dispatch(getSems(search));
  }, [dispatch, search]);
  useEffect(() => {
    if (semList) {
      setAllSemesters(semList);
    }
  }, [semList]);
  console.log(allSemesters);
  return (
    <Fragment>
      <h1>Manage Semesters</h1>
      <div className={styles["add-sem-btn-container"]}>
        <IconButton
          label="Add Semester"
          type="primary"
          size="xs"
          svg={icon}
          onClick={onNavigateCreateSemester}
        />
      </div>
      <div className={styles["clearfix"]}></div>

      {allSemesters.map((sem, index) => (
        <SemesterRows
          key={index}
          semId={sem.id}
          label={sem.label}
          schoolYear={sem.school_year}
        />
      ))}
      <div className={styles["paginator-container"]}>
        <Paginator page={page} pages={pages} />
      </div>
    </Fragment>
  );
};

export default ManageSemesters;
