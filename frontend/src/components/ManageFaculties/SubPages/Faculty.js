import React, { Fragment, useState, useEffect } from "react";
import table from "./Table.module.css";
import SearchField from "../../UI/FormControl/SearchField/SearchField";
import Rows from "./Rows";
import styles from "./Subpages.module.css";
import { getFaculties } from "../../../store/manageFacultiesActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Paginator from "../SubComponents/Paginator";
const Faculty = () => {
  const search = useLocation().search;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const getFacultiesReducerValues = useSelector((state) => state.getFaculties);
  const {
    isLoading: getFacultiesIsLoading,
    error: getFacultiesError,
    faculties: { faculties, pages, page },
  } = getFacultiesReducerValues;

  const changeUserTypeReducerValues = useSelector(
    (state) => state.changeUserType
  );
  const {
    isLoading: userTypeIsLoading,
    error: userTypeError,
    success: userTypeSuccess,
  } = changeUserTypeReducerValues;

  const assignedFacultyReducerValues = useSelector(
    (state) => state.assignedFaculty
  );
  const { isLoading: assignIsLoading } = assignedFacultyReducerValues;

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
      dispatch(getFaculties(search));
    }
  }, [
    dispatch,
    userTypeSuccess,
    userTypeIsLoading,
    assignIsLoading,
    search,
    ableToSearch,
  ]);

  useEffect(() => {
    if (faculties && !userTypeIsLoading) {
      setListFaculty(faculties);
    }
  }, [faculties, userTypeIsLoading]);

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
              assignee_id={data.assignee_id}
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

export default Faculty;
