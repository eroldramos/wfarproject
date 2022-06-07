import CustomSearchField from "../../../../UI/FormControl/SearchField/CustomSearchField";
import styles from "../ViewFacultyStatus.module.css";
import Rows from "./Rows";
import Button from "../../../../UI/FormControl/Button/Button";
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
import Swal from "sweetalert2";

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
      width="16"
      height="16"
      viewBox="0 0 84 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M48 16C48 7.16 40.84 0 32 0C23.16 0 16 7.16 16 16C16 24.84 23.16 32 32 32C40.84 32 48 24.84 48 16ZM60 24V32H84V24H60ZM0 56V64H64V56C64 45.36 42.68 40 32 40C21.32 40 0 45.36 0 56Z"
        fill="white"
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
    if (event.target.value.length == 0) {
      if (window.location.pathname.split("/")[2] == "area-chair") {
        navigate(
          "/manage-faculty/area-chair/assigned-faculty/" + params.id + "/"
        );
      }
      if (window.location.pathname.split("/")[2] == "department-head") {
        navigate(
          "/manage-faculty/department-head/assigned-faculty/" + params.id + "/"
        );
      }
    }
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

    props.onClose();
    Swal.fire({
      html: `<h4>Do you want to unassign some faculty from ${props.fullname}</h4>`,
      icon: "question",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "OK",
      iconColor: "#D1D1D1", // question icon color
      confirmButtonColor: "#BE5A40",
      cancelButtonColor: "#A1A1A1",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(unassignedFaculty(data));
      } else if (result.isDenied) {
      } else if (result.isDismissed) {
      }
    });
  };
  const closeModal = () => {
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
          <CustomSearchField
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
            {/* <div className={table["icon-container"]}>
              {selectedUser.length > 0 && (
                <TransparentButton
                  onClick={onUnassignedFacultyHandler}
                  label="Remove"
                  type="transparent"
                  size="xs"
                  svg={icon}
                />
              )}
            </div> */}
          </div>
        </li>
        {listFaculties.length === 0 && (
          <p className={table["no-data-text"]}>No data Found</p>
        )}
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
      <div className={styles["button-container"]}>
        <div className={styles["cancel-btn-container"]}>
          <Button onClick={closeModal} label="Cancel" type="cancel" size="s" />
        </div>
        <div className={styles["icon-container"]}>
          {selectedUser.length > 0 && (
            <TransparentButton
              onClick={onUnassignedFacultyHandler}
              label="Remove"
              type="transparent"
              size="cs"
              svg={icon}
            />
          )}
        </div>
        <div className={styles["clearfix"]}></div>
      </div>
    </Fragment>
  );
};

export default AssignedFaculty;
