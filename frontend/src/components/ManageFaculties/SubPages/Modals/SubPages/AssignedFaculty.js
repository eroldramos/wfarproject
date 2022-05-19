import SearchField from "../../../../UI/FormControl/SearchField/SearchField";
import styles from "../ViewFacultyStatus.module.css";
import Rows from "./Rows";
import table from "./Table.module.css";
import React, { Fragment, useState, useEffect } from "react";
import TransparentButton from "../../../../UI/FormControl/Button/TransparentButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  getAssignedFaculties,
  unassignedFaculty,
} from "../../../../../store/manageFacultiesActions";
import Paginator from "../../../SubComponents/Paginator";
const AssignedFaculty = (props) => {
  let navigate = useNavigate();
  const search = useLocation().search;
  const params = useParams();
  const dispatch = useDispatch();
  const getAssignedFacultiesReducerValues = useSelector(
    (state) => state.getAssignedFaculties
  );

  const {
    isLoading: assignedIsLoading,
    error: assignedError,
    assignedFaculties: { assigned_faculties, page, pages },
  } = getAssignedFacultiesReducerValues;

  useEffect(() => {
    console.log("initialize");
    dispatch(getAssignedFaculties(params.id, search));
  }, [dispatch, params.id, search]);

  useEffect(() => {
    if (assigned_faculties && !assignedIsLoading) {
      setListFaculties(assigned_faculties);
      setCheckedState(new Array(assigned_faculties.length).fill(false));
    }
  }, [assigned_faculties, assignedIsLoading]);

  const icon = (
    <svg
      width="18"
      height="13"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0833 3.33335C10.0833 1.58377 8.66617 0.166687 6.91658 0.166687C5.167 0.166687 3.74992 1.58377 3.74992 3.33335C3.74992 5.08294 5.167 6.50002 6.91658 6.50002C8.66617 6.50002 10.0833 5.08294 10.0833 3.33335ZM12.4583 4.91669V6.50002H17.2083V4.91669H12.4583ZM0.583252 11.25V12.8333H13.2499V11.25C13.2499 9.14418 9.03033 8.08335 6.91658 8.08335C4.80283 8.08335 0.583252 9.14418 0.583252 11.25Z"
        fill="#BE5A40"
      />
    </svg>
  );
  const [listFaculties, setListFaculties] = useState([
    {
      id: 1,
      fullname: "Erold Ramos",
    },
    {
      id: 2,
      fullname: "Erold Ramos",
    },
  ]);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedUser, setSelectedUser] = useState([]);
  const [modalIsShown, setModalIsShown] = useState(false);
  const [searchFaculty, setSearchFaculty] = useState("");

  const [checkedState, setCheckedState] = useState(
    new Array(listFaculties.length).fill(false)
  );
  const selectAllUsers = () => {
    if (isChecked) {
      setIsChecked((isChecked) => !isChecked);
      const updatedCheckedState = checkedState.map((currentCheckState, index) =>
        currentCheckState === isChecked ? currentCheckState : !currentCheckState
      );

      setCheckedState(updatedCheckedState);

      let arrayId = [];
      const newArrayId = updatedCheckedState.reduce(
        (sum, currentState, index) => {
          if (currentState === true) {
            arrayId.push({
              id: listFaculties[index].id,
              fullname: listFaculties[index].fullname,
            });
            return arrayId;
          }
          return arrayId;
        },
        0
      );
      setSelectedUser(newArrayId);
    }
    if (!isChecked) {
      setIsChecked((isChecked) => !isChecked);
      const updatedCheckedState = checkedState.map((currentCheckState, index) =>
        currentCheckState === !isChecked
          ? !currentCheckState
          : currentCheckState
      );

      setCheckedState(updatedCheckedState);
      let arrayId = [];
      const newArrayId = updatedCheckedState.reduce(
        (sum, currentState, index) => {
          if (currentState === true) {
            arrayId.push({
              id: listFaculties[index].id,
              fullname: listFaculties[index].fullname,
            });
            return arrayId;
          }
          return arrayId;
        },
        0
      );
      setSelectedUser(newArrayId);
    }
  };

  const handleOnChange = (position) => {
    if (!isChecked) {
      setIsChecked(true);
    }
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    let arrayId = [];
    const newArrayId = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          arrayId.push({
            id: listFaculties[index].id,
            fullname: listFaculties[index].fullname,
          });
          return arrayId;
        }
        return arrayId;
      },
      0
    );
    setSelectedUser(newArrayId);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (searchFaculty) {
      console.log(window.location.pathname, "SEARCHHHHHHH");
      navigate(`${window.location.pathname}?search=${searchFaculty}&page=1`);
    } else {
      console.log(window.location);
      navigate(window.location);
    }
  };
  const setSearchFacultyValue = (event) => {
    setSearchFaculty(event.target.value);
  };

  const onUnassignedFacultyHandler = () => {
    let selectedId = [];
    for (let user of selectedUser) {
      selectedId.push(user.id);
    }
    console.log(selectedId);
    let data = {
      unassigned_faculties: selectedId,
    };

    dispatch(unassignedFaculty(data));
    alert("Removed Successfully");
    props.onClose();
  };

  console.log(isChecked);
  console.log(checkedState);
  console.log(selectedUser);
  console.log(checkedState[0]);
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
          >
            <input
              type="checkbox"
              checked={!isChecked && selectedUser.length > 0 ? true : false}
              onChange={() => selectAllUsers()}
            />
          </div>
          <div
            className={`${table["col"]} ${table["col-2"]} ${table["col-header"]}`}
          >
            <div className={table["label-container"]}>
              {selectedUser.length} Selected.
            </div>
            <div className={table["icon-container"]}>
              {selectedUser.length > 0 && (
                <TransparentButton
                  onClick={onUnassignedFacultyHandler}
                  label="Remove "
                  type="transparent"
                  size="xs"
                  svg={icon}
                />
              )}
            </div>
          </div>
        </li>
        {listFaculties.length === 0 && <p>Not Found</p>}
        {listFaculties &&
          listFaculties.map((data, index) => (
            <Rows
              id={data.id}
              first_name_and_middle_name={`${data.first_name} ${data.middle_name}`}
              last_name={data.last_name}
              key={index}
              checked={checkedState[index] ? checkedState[index] : false}
              onChange={() => handleOnChange(index)}
            />
          ))}
      </ul>
      <div className={styles["paginator-container"]}>
        <Paginator
          search={search}
          page={page}
          pages={pages}
          url={`${window.location.pathname}`}
        />
      </div>
    </Fragment>
  );
};

export default AssignedFaculty;
