import React, { Fragment, useState, useEffect } from "react";
import styles from "./ManageSemesters.module.css";
import IconButton from "../UI/FormControl/Button/IconButton";
import SemesterRows from "./SemesterRows";
import { useSelector, useDispatch } from "react-redux";
import { getSems } from "../../store/manageSemActions";
import Paginator from "./Paginator/Paginator";
import DefaultPage from "./DefaultPage";
import ArchivedPage from "./ArchivedPage";
import Tab from "../UI/Tab/Tab";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"; //for routing
const ManageSemesters = () => {
  const loggedUser = useSelector((state) => state.login);
  const { userInfo } = loggedUser;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const onChangePageHandler = (page) => {
    setCurrentPage(page);

    if (page == 1) {
      navigate("/manage-semesters/");
    }
    if (page == 2) {
      navigate("/manage-semesters/archives/");
    }
  };

  const SAMPLE_ITEMS = [
    {
      label: "Semesters",
      id: 1,
      side: false,
      onClick: () => onChangePageHandler(1),
    },
    {
      label: "Archives",
      id: 2,
      side: false,
      onClick: () => onChangePageHandler(2),
    },
  ];
  useEffect(() => {
    navigate("/manage-semesters/");
  }, []);
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

  const onNavigateCreateSemester = () => {
    navigate("/create-semester");
  };

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
      <Tab items={SAMPLE_ITEMS} currentPage={currentPage}></Tab>

      <div className={styles["semester-list-container"]}>
        <Routes>
          {/* in element properties we insert any element to render even exported elemt */}
          <Route path="/" element={<DefaultPage />} />
          <Route path="archives/" element={<ArchivedPage />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default ManageSemesters;
