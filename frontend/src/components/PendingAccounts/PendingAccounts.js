import React, { Fragment, useState, useEffect } from "react";
import Modal from "../UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getPendingAccounts,
  acceptAccounts,
  acceptAccountResetValue,
} from "../../store/pendingAccountsActions";
import SmallButton from "../UI/FormControl/Button/SmallButton";
import Button from "../UI/FormControl/Button/Button";
import SearchField from "../UI/FormControl/SearchField/SearchField";
import styles from "./PendingAccounts.module.css";
import table from "./Table.module.css";
import PendingRows from "./PendingRows";
import PrintButton from "../UI/FormControl/Button/PrintButton";
import Paginator from "./Paginator";
const PendingAccounts = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const search = useLocation().search;
  const pendingFaculties = useSelector((state) => state.getPendingAccounts);
  const {
    isLoading,
    error,
    pendingAccounts: { faculties, page, pages },
  } = pendingFaculties;

  const acceptPendings = useSelector((state) => state.acceptAccounts);
  const {
    success,
    isLoading: acceptIsLoading,
    error: acceptIsError,
  } = acceptPendings;

  // CONST [LISTPENDINGACCOUNTS, SETLISTPENDINGACCOUNTS] = USESTATE(
  //   FACULTIES ? FACULTIES : []
  // );
  // CONST PENDING_ACCOUNTS = [
  //   {
  //     ID: 1,
  //     FULLNAME: "EROLD RAMOS",
  //     EMPNO: "2018-101188",
  //     USERNAME: "EROLDRAMOS",
  //     EMAIL: "EROLDRAMOS@GMAIL.COM",
  //     CONTACT: "09563435355",
  //     CREATEDAT: "2015-02-03",
  //   },
  //   {
  //     ID: 2,
  //     FULLNAME: "EROLD RAMOS",
  //     EMPNO: "2018-101188",
  //     USERNAME: "EROLDRAMOS",
  //     EMAIL: "EROLDRAMOS@GMAIL.COM",
  //     CONTACT: "09563435355",
  //     CREATEDAT: "2015-02-03",
  //   },
  // ];
  const [listPendingAccounts, setListPendingAccounts] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedUser, setSelectedUser] = useState([]);
  const [modalIsShown, setModalIsShown] = useState(false);
  const [searchFaculty, setSearchFaculty] = useState("");

  const loggedUser = useSelector((state) => state.login);
  const { userInfo } = loggedUser;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      navigate("/pending-accounts/?search=&page=1");
      setSelectedUser([]);
      dispatch(acceptAccountResetValue());
    }
    dispatch(getPendingAccounts(search));
  }, [dispatch, search, success, navigate]);

  useEffect(() => {
    if (faculties && !success) {
      setListPendingAccounts(faculties);
    }
  }, [faculties, success]);

  useEffect(() => {
    if (listPendingAccounts.length > 0 && !success) {
      setCheckedState(new Array(listPendingAccounts.length).fill(false));
    }
  }, [listPendingAccounts, success]);

  const [checkedState, setCheckedState] = useState(
    new Array(listPendingAccounts.length).fill(false)
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
              id: listPendingAccounts[index].id,
              fullname: listPendingAccounts[index].fullname,
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
              id: listPendingAccounts[index].id,
              fullname: listPendingAccounts[index].fullname,
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
            id: listPendingAccounts[index].id,
            fullname: listPendingAccounts[index].fullname,
          });
          return arrayId;
        }
        return arrayId;
      },
      0
    );
    setSelectedUser(newArrayId);
  };

  const onOpenModalHandler = () => {
    setModalIsShown(true);
  };

  const onCloseModalHandler = () => {
    setModalIsShown(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (searchFaculty) {
      navigate(`/pending-accounts/?search=${searchFaculty}&page=1`);
    } else {
      navigate(window.location);
    }
  };

  const setSearchFacultyValue = (event) => {
    setSearchFaculty(event.target.value);
  };

  const onAcceptAccountsHandler = () => {
    setModalIsShown(false);
    let selectedId = [];
    for (let user of selectedUser) {
      selectedId.push(user.id);
    }
    dispatch(acceptAccounts(selectedId));
  };

  console.log(isChecked);
  console.log(checkedState);
  console.log(selectedUser);
  console.log(checkedState[0]);
  console.log("-------------", page, pages);
  return (
    <Fragment>
      {modalIsShown && (
        <Modal onClose={onCloseModalHandler}>
          <div style={{ padding: "10px" }}>
            <h1>
              The following accounts will be accepted. Click confirm to accept.
            </h1>
            <div className={styles["box"]}>
              {selectedUser.length > 0 &&
                selectedUser.map((faculty, index) => (
                  <p key={index}>{faculty.fullname}</p>
                ))}
            </div>
            <div style={{ padding: "15px 0 0 0" }}>
              <div className={styles["modal-right-button"]}>
                <Button
                  label="Cancel"
                  type="cancel"
                  size="s"
                  onClick={onCloseModalHandler}
                />
              </div>
              <div className={styles["modal-left-button"]}>
                <Button
                  label="Accept All"
                  type="primary"
                  size="s"
                  onClick={onAcceptAccountsHandler}
                />
              </div>
              <div className={styles["clearfix"]}></div>
            </div>
          </div>
        </Modal>
      )}

      <h1>Pending Faculties</h1>
      <div className={styles["container"]}>
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
        <div className={styles["small-btn-container"]}>
          {selectedUser.length > 0 && (
            <SmallButton
              label="Accept Accounts"
              type="primary"
              onClick={onOpenModalHandler}
            />
          )}
        </div>
        <div className={styles["clearfix"]}></div>
      </div>
      {/* TABLE START */}
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
            Full Name
          </div>
          <div
            className={`${table["col"]} ${table["col-3"]} ${table["col-header"]}`}
          >
            Employee No.
          </div>
          <div
            className={`${table["col"]} ${table["col-4"]} ${table["col-header"]}`}
          >
            Username
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
            Created At
          </div>
          <div
            className={`${table["col"]} ${table["col-8"]} ${table["col-header"]}`}
          >
            Action
          </div>
        </li>
        {acceptIsLoading && <p>Accepting...</p>}
        {acceptIsError && <p>{acceptIsError}</p>}
        {success && <p>{success}</p>}
        {isLoading && <p>Loading</p>}
        {error && <p>{error}</p>}
        {listPendingAccounts.length === 0 && <p>Not Found</p>}
        {listPendingAccounts &&
          listPendingAccounts.map((data, index) => (
            <PendingRows
              id={data.id}
              fullname={data.fullname}
              emp_no={data.emp_no}
              username={data.username}
              email={data.email}
              contact_no={data.contact_no}
              createdAt={data.createdAt}
              key={index}
              checked={checkedState[index] ? checkedState[index] : false}
              onChange={() => handleOnChange(index)}
            />
          ))}
      </ul>
      {/* TABLE END */}
      <div className={styles["bottom-box-container"]}>
        <div className={styles["paginator-container"]}>
          <Paginator page={page} pages={pages} search={search} />
        </div>
        <div className={styles["export-container"]}>
          <PrintButton label="Export" type="cancel" size></PrintButton>
        </div>
        <div className={styles["clearfix"]}></div>
      </div>
    </Fragment>
  );
};

export default PendingAccounts;
