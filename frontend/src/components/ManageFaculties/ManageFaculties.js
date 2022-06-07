import React, { Fragment, useState, useEffect } from "react";
import styles from "./ManageFaculties.module.css";
import Tab from "../UI/Tab/Tab";
import DepartmentHead from "./SubPages/DepartmentHead";
import AreaChair from "./SubPages/AreaChair";
import Faculty from "./SubPages/Faculty";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
const ManageFaculties = () => {
  const loggedUser = useSelector((state) => state.login);
  const { userInfo } = loggedUser;
  const SAMPLE_ITEMS = [
    {
      label: "Department Head",
      id: 1,
      side: false,
      onClick: () => onChangePageHandler(1),
    },
    {
      label: "Area Chair",
      id: 2,
      side: false,
      onClick: () => onChangePageHandler(2),
    },
    {
      label: userInfo && userInfo.isAdmin ? "Faculty" : "My Faculty",
      id: 3,
      side: false,
      onClick: () => onChangePageHandler(3),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  let navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate("/manage-faculty/department-head/");
    }
    if (userInfo && !userInfo.isAdmin) {
      navigate("/manage-faculty/faculty/");
      setCurrentPage(3);
    }
  }, []);

  const onChangePageHandler = (page) => {
    setCurrentPage(page);

    if (page == 1) {
      navigate("/manage-faculty/department-head/");
    }
    if (page == 2) {
      navigate("/manage-faculty/area-chair/");
    }
    if (page == 3) {
      navigate("/manage-faculty/faculty/");
    }
  };
  console.log(currentPage);
  return (
    <Fragment>
      <h1>Manage Faculty</h1>
      <div className={styles["main-container"]}>
        <div className={styles["tab-container"]}>
          <Tab
            items={
              userInfo && userInfo.isAdmin
                ? SAMPLE_ITEMS
                : SAMPLE_ITEMS.slice(2, 3)
            }
            currentPage={currentPage}
          />
        </div>

        <Routes>
          {userInfo && userInfo.isAdmin && (
            <Route path="department-head/*" element={<DepartmentHead />} />
          )}
          {userInfo && userInfo.isAdmin && (
            <Route path="area-chair/*" element={<AreaChair />} />
          )}

          <Route path="faculty/*" element={<Faculty />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default ManageFaculties;
