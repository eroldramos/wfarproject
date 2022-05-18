import { Fragment, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Tab from "../UI/Tab/Tab";
import ArchivedEntries from "./ArchivedEntries/ArchivedEntries";
import SemesterDropdownField from "./Filter/SemesterDropdownField";
import styles from "./MySubmission.module.css";
import MyWFAR from "./MyWFAR/MyWFAR";
import { useSelector, useDispatch } from "react-redux";
import { retrieveWfars, retrieveArchivedWfars, retrieveWfarsSemestersList } from "../../store/myWfarsActions";
import { myWfarSemesterFilterActions, myWfarRefreshActions } from "../../store/myWfarReducers";

const MySubmission = (props) => {

    // hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // redux states, objects
    const wfars = useSelector((state) => state.myWfars.wfars);
    const archivedWfarEntries = useSelector((state) => state.myWfarsArchived.archivedEntries);
    const semesters = useSelector((state) => state.wfarSemesters.semesters);
    const newChange = useSelector((state) => state.myWfarRefresh.newChange);
    
    // redux states, filter
    const filterSemester = useSelector((state) => state.myWfarSemesterFilter.semester_id);
    
    // retrieving wfars and archived wfars
    useEffect(() => {
        // mag-run tayo dito ng magdedetermine kung ano 'yung active semester
        console.log("FILTER SEMESTER RETRIEVE");
        dispatch(retrieveWfars(filterSemester));
        dispatch(retrieveArchivedWfars(filterSemester));
        dispatch(retrieveWfarsSemestersList(filterSemester));

    }, [filterSemester]);

    useEffect(() => {
        if (newChange === true) {
            console.log("NEW CHANGE RETRIEVE");
            dispatch(retrieveWfars(filterSemester));
            dispatch(retrieveArchivedWfars(filterSemester));
            dispatch(myWfarRefreshActions.resetNewChange());
        }
    }, [newChange])

    // handlers
    const onChangeSemesterHandler = (id) => {
        dispatch(myWfarSemesterFilterActions.changeSemesterFilter({ id: id }))
    }

    // tab
    const tab_items = [
        {
            label: "My WFARs",
            id: 1,
            side: false,
            onClick: () => onChangePageHandler(1)
        },
        {
            label: "Archived WFAR Entries",
            id: 2,
            side: true,
            onClick: () => onChangePageHandler(2)
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const onChangePageHandler = (page) => {
        setCurrentPage(page);

        switch (page) {
            case 1:
                console.log("navigate");
                console.log(wfars);
                navigate("");
                break;

            case 2:
                navigate("archived");
                break;

            default:
                navigate("");
                break;
        }
    }

    return (
        <Fragment>
            <h1>My Weekly gagagasFaculty Accomplishment Reports</h1>
            <SemesterDropdownField
                id="semester"
                name="semester"
                labelName={"Semester"}
                onChange={onChangeSemesterHandler}
                options={semesters}
                size="rg"
                type="filter" />

            <div className={styles["tab-container"]}>
                <Tab items={tab_items} currentPage={currentPage} />
                <Routes>
                    <Route path="" element={<MyWFAR items={wfars} />}></Route>
                    <Route path="archived" element={<ArchivedEntries items={archivedWfarEntries} />}></Route>
                </Routes>
            </div>
        </Fragment>
    )
}

export default MySubmission;