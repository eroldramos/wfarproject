import React, { Fragment, useState, useEffect } from "react";
import table from "./Table.module.css";
import SearchField from "../../UI/FormControl/SearchField/SearchField";
import Rows from "./Rows";
import styles from "./Subpages.module.css";
import { getAreaChairs } from "../../../store/manageFacultiesActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
const AreaChair = () => {
  const search = useLocation().search;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const getAreaChairsReducerValues = useSelector(
    (state) => state.getAreaChairs
  );
  const {
    isLoading: getAreaChairsIsLoading,
    error: getAreaChairsError,
    areachairs,
  } = getAreaChairsReducerValues;

  const changeUserTypeReducerValues = useSelector(
    (state) => state.changeUserType
  );
  const {
    isLoading: userTypeIsLoading,
    error: userTypeError,
    success: userTypeSuccess,
  } = changeUserTypeReducerValues;

  const [searchFaculty, setSearchFaculty] = useState("");
  const [listFaculty, setListFaculty] = useState([
    // {
    //   id: 1,
    //   fullname: "Ramos Erold 1",
    //   emp_no: "2018-101188",
    //   username: "eroldramos",
    //   birthdate: "2015-02-03",
    //   email: "eroldramos@gmail.com",
    //   contact_no: "09563435355",
    //   user_type: 1,
    // },
    // {
    //   id: 2,
    //   fullname: "Erold Ramos",
    //   emp_no: "2018-101188",
    //   username: "eroldramos",
    //   birthdate: "2015-02-03",
    //   email: "eroldramos@gmail.com",
    //   contact_no: "09563435355",
    //   user_type: 1,
    // },
  ]);
  useEffect(() => {
    if (userTypeSuccess && !userTypeIsLoading) {
      console.log("ufkckkkkcakdsakfk");
      navigate("/manage-faculty/area-chair/");
    }
    dispatch(getAreaChairs());
  }, [dispatch, userTypeSuccess, userTypeIsLoading]);

  useEffect(() => {
    if (areachairs && !userTypeIsLoading) {
      setListFaculty(areachairs);
    }
  }, [areachairs, userTypeIsLoading]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  const setSearchFacultyValue = (event) => {
    setSearchFaculty(event.target.value);
  };
  return (
    <Fragment>
      <div className={styles["search-field-container"]}>
        <form onSubmit={onSubmitHandler}>
          <SearchField
            id="link"
            onChange={setSearchFacultyValue}
            labelName="search"
            inputName="search"
            value={searchFaculty}
            placeholder="Search faculty"
            size=""
            type="filter"
          />
        </form>
      </div>
      <ul className={table["responsive-table"]}>
        <li className={table["table-header"]}>
          <div
            className={`${table["col"]} ${table["col-1"]} ${table["col-header"]}`}
          >
            Full Name
          </div>
          <div
            className={`${table["col"]} ${table["col-2"]} ${table["col-header"]}`}
          >
            Employee No.
          </div>
          <div
            className={`${table["col"]} ${table["col-3"]} ${table["col-header"]}`}
          >
            Username
          </div>
          <div
            className={`${table["col"]} ${table["col-4"]} ${table["col-header"]}`}
          >
            Birthdate
          </div>
          <div
            className={`${table["col"]} ${table["col-5"]} ${table["col-header"]}`}
          >
            Email
          </div>
          <div
            className={`${table["col"]} ${table["col-6"]} ${table["col-header"]}`}
          >
            Contact
          </div>
          <div
            className={`${table["col"]} ${table["col-7"]} ${table["col-header"]}`}
          >
            Actions
          </div>
        </li>

        {listFaculty &&
          listFaculty.map((data, index) => (
            <Rows
              id={data.id}
              fullname={`${data.last_name}, ${data.first_name} ${data.middle_name}`}
              emp_no={data.emp_no}
              username={data.username}
              email={data.email}
              contact_no={data.contact_no}
              birthdate={data.birthdate}
              user_type={data.user_type}
              assignee_id={data.assignee_id}
              key={index}
            />
          ))}
      </ul>
    </Fragment>
  );
};

export default AreaChair;
