import { Fragment, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Tab from "../UI/Tab/Tab";
import ArchivedEntries from "./ArchivedEntries/ArchivedEntries";
import SemesterDropdownField from "./Filter/SemesterDropdownField";
import styles from "./MySubmission.module.css";
import MyWFAR from "./MyWFAR/MyWFAR";
import { useSelector, useDispatch } from "react-redux";
import { retrieveWfars, retrieveArchivedWfars, retrieveWfarsSemestersList } from "../../store/myWfarsActions";

const MySubmission = (props) => {

    const wfars = useSelector((state) => state.myWfars.wfars);
    const archivedWfarEntries = useSelector((state) => state.myWfarsArchived.archivedEntries);
    const semesters = useSelector((state) => state.wfarSemesters.semesters);
    const dispatch = useDispatch();
    const [filterSemester, setFilterSemester] = useState(1);

    useEffect(() => {
        dispatch(retrieveWfars(filterSemester));
        dispatch(retrieveArchivedWfars(filterSemester));
        dispatch(retrieveWfarsSemestersList(filterSemester));

    }, [filterSemester]);

    const onChangeSemesterHandler = (id) => {
        setFilterSemester(id);
    }

    const TABS = [
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

    const WFAR_ARCHIVED_ENTRIES = [
        {
            id: 1,
            applicableDate: "April 28, 2022",
            CYS: "BSIT 3M",
            subject: "Cap 301 - Capstone Research and Project 1",
            semester: "2021-2022 1st Semester",
            weekTitle: "Week 7",
            wfarID: 1
        }
    ]


    let navigate = useNavigate();

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
            <h1>My Weekly Faculty Accomplishment Reports</h1>
            <SemesterDropdownField
                id="semester"
                name="semester"
                labelName={"Semester"}
                onChange={onChangeSemesterHandler}
                options={semesters}
                size="rg"
                type="filter" />

            <div className={styles["tab-container"]}>
                <Tab items={TABS} currentPage={currentPage}/>
                
                <Routes>
                    <Route path="" element={<MyWFAR items={wfars} />}></Route>
                    <Route path="archived" element={<ArchivedEntries items={archivedWfarEntries} />}></Route>
                </Routes>
            </div>
        </Fragment>
    )
}

export default MySubmission;