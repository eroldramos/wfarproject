import SearchField from "../../../../UI/FormControl/SearchField/SearchField";
import styles from "../ViewFacultyStatus.module.css";
import RadioRows from "./RadioRows";
import table from "./Table.module.css";
import React, { Fragment, useState, useEffect } from "react";
import TransparentButton from "../../../../UI/FormControl/Button/TransparentButton";
import {
  getAreaChairs,
  assignedFaculty,
} from "../../../../../store/manageFacultiesActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Paginator from "../../../SubComponents/Paginator";
const AreaChair = (props) => {
  const icon = (
    <svg
      width="19"
      height="13"
      viewBox="0 0 19 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2917 3.33334C10.2917 1.58376 8.87466 0.166672 7.12508 0.166672C5.3755 0.166672 3.95841 1.58376 3.95841 3.33334C3.95841 5.08292 5.3755 6.5 7.12508 6.5C8.87466 6.5 10.2917 5.08292 10.2917 3.33334ZM11.8751 4.91667V6.5H14.2501V8.875H15.8334V6.5H18.2084V4.91667H15.8334V2.54167H14.2501V4.91667H11.8751ZM0.791748 11.25V12.8333H13.4584V11.25C13.4584 9.14417 9.23883 8.08334 7.12508 8.08334C5.01133 8.08334 0.791748 9.14417 0.791748 11.25Z"
        fill="#BE5A40"
      />
    </svg>
  );

  const search = useLocation().search;
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const getAreaChairsReducerValues = useSelector(
    (state) => state.getAreaChairs
  );
  const {
    isLoading: getAreaChairsIsLoading,
    error: getAreaChairsError,
    areachairs: { faculties: areachairs, pages, page },
  } = getAreaChairsReducerValues;
  useEffect(() => {
    dispatch(getAreaChairs(search));
  }, [dispatch, search]);

  useEffect(() => {
    if (areachairs) {
      setListFaculty(areachairs);
    }
  }, [areachairs]);

  const [searchFaculty, setSearchFaculty] = useState("");
  const [listFaculty, setListFaculty] = useState([
    {
      id: 1,
      fullname: "Erold Ramos",
    },
    {
      id: 2,
      fullname: "Erold Ramos",
    },
  ]);
  const [assigneeId, setAssigneeId] = useState("");
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
  const onHandleChange = (event) => {
    setAssigneeId(event.target.value);
  };

  const onAssignedFacultyHandler = () => {
    let selectedId = [];

    selectedId.push(props.id);

    console.log(selectedId);
    let data = {
      assignee_id: assigneeId,
      assigned_faculties: selectedId,
    };

    dispatch(assignedFaculty(data));
    console.log(data);
    alert("Assigned Successfully");
    props.onCloseAssignModal();
  };

  console.log(assigneeId);
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
            size="lg"
            type="filter"
          />
        </form>
      </div>
      <ul className={table["responsive-table"]}>
        <li className={table["table-header"]}>
          <div
            className={`${table["col"]} ${table["col-1"]} ${table["col-header"]}`}
          ></div>
          <div
            className={`${table["col"]} ${table["col-2"]} ${table["col-header"]}`}
          >
            <div className={table["label-container"]}>
              Choose An Area Chair
            </div>
            <div className={table["icon-container2"]}>
              {assigneeId > 0 && (
                <TransparentButton
                  onClick={onAssignedFacultyHandler}
                  label="Assign"
                  type="transparent"
                  size="xs"
                  svg={icon}
                />
              )}
            </div>
          </div>
        </li>
        {listFaculty.length === 0 && <p className={table["no-data-text"]}>No data Found</p>}
        {listFaculty &&
          listFaculty.map((data, index) => (
            <RadioRows
              id={data.id}
              value={data.id}
              first_name_and_middle_name={`${data.first_name} ${data.middle_name}`}
              last_name={data.last_name}
              key={index}
              checked={assigneeId == data.id}
              onChange={onHandleChange}
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

export default AreaChair;
