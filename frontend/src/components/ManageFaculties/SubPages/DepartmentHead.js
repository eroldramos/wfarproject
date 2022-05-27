import React, { Fragment, useState, useEffect } from "react";
import table from "./Table.module.css";
import CustomSearchField from "../../UI/FormControl/SearchField/CustomSearchField";
import Rows from "./Rows";
import styles from "./Subpages.module.css";
import { getDepartmentHeads } from "../../../store/manageFacultiesActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Paginator from "../SubComponents/Paginator";
const DepartmentHead = () => {
  const search = useLocation().search;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const getDepartmentHeadsReducerValues = useSelector(
    (state) => state.getDepartmentHeads
  );
  const {
    isLoading: getDepartmentHeadsIsLoading,
    error: getDepartmentHeadsError,
    departmentheads: { faculties: departmentheads, pages, page },
  } = getDepartmentHeadsReducerValues;

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
  const [ableToSearch, setAbleToSearch] = useState(true);
  useEffect(() => {
    if (userTypeSuccess && !userTypeIsLoading) {
      console.log("ufkckkkkcakdsakfk");
      navigate(window.location.pathname);
    }
    if (ableToSearch) {
      dispatch(getDepartmentHeads(search));
    }
  }, [dispatch, userTypeSuccess, userTypeIsLoading, search, ableToSearch]);

  useEffect(() => {
    if (departmentheads && !userTypeIsLoading) {
      setListFaculty(departmentheads);
    }
  }, [departmentheads, userTypeIsLoading]);

  const disableSearch = () => {
    setAbleToSearch(false);
  };
  const enableSearch = () => {
    setAbleToSearch(true);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (searchFaculty) {
      navigate(`${window.location.pathname}?search=${searchFaculty}&page=1`);
    } else {
      navigate(window.location);
    }
  };
  const setSearchFacultyValue = (event) => {
    setSearchFaculty(event.target.value);
  };
  return (
    <Fragment>
      <div className={styles["search-field-container"]}>
        <form onSubmit={onSubmitHandler}>
          <CustomSearchField
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
            <h5>Full Name</h5>
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.70835 4.12492L8.0621 4.77117L5.95835 2.672V10.0833H5.04169V2.672L2.93794 4.77575L2.29169 4.12492L5.50002 0.916585L8.70835 4.12492Z"
                fill="#666B73"
              />
            </svg>
          </div>
          <div
            className={`${table["col"]} ${table["col-2"]} ${table["col-header"]}`}
          >
            <h5>Employee No.</h5>
          </div>
          <div
            className={`${table["col"]} ${table["col-3"]} ${table["col-header"]}`}
          >
            <h5>Username</h5>
          </div>
          <div
            className={`${table["col"]} ${table["col-4"]} ${table["col-header"]}`}
          >
            <h5>Birthdate</h5>
          </div>
          <div
            className={`${table["col"]} ${table["col-5"]} ${table["col-header"]}`}
          >
            <h5>Email</h5>
          </div>
          <div
            className={`${table["col"]} ${table["col-6"]} ${table["col-header"]}`}
          >
            <h5>Contact</h5>
          </div>
          <div
            className={`${table["col"]} ${table["col-7"]} ${table["col-header"]}`}
          >
            <h5>Actions</h5>
          </div>
        </li>
        {listFaculty.length === 0 && (
          <p className={styles["no-data-text"]}>No data Found</p>
        )}
        {listFaculty &&
          listFaculty.map((data, index) => (
            <Rows
              enableSearch={enableSearch}
              disableSearch={disableSearch}
              id={data.id}
              fullname={`${data.last_name}, ${data.first_name} ${data.middle_name}`}
              emp_no={data.emp_no}
              username={data.username}
              email={data.email}
              contact_no={data.contact_no}
              birthdate={data.birthdate}
              user_type={data.user_type}
              key={index}
            />
          ))}
      </ul>
      <div className={styles["paginator-container"]}>
        <Paginator
          search={search}
          page={page}
          pages={pages}
          url={window.location.pathname}
        />
      </div>
    </Fragment>
  );
};

export default DepartmentHead;
