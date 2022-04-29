import { Fragment } from "react";
import SemesterDropdownField from "./components/SemesterDropdownField";

const MySubmission = (props) => {


    const SAMPLE_ITEMS = [
        { label: "2021 - 2022 1st Semester", id: 1 },
        { label: "2021 - 2022 2st Semester", id: 2 },
        { label: "2022 - 2023 1st Semester", id: 3 }
    ];

    return (
        <Fragment>
            <h1>My Weekly Faculty Accomplishment Reports</h1>
            <SemesterDropdownField
                id="semester"
                name="semester"
                labelName={"Semester"}
                onChange={null}
                options={SAMPLE_ITEMS}
                size="rg"
                type="filter" />
        </Fragment>
    )
}

export default MySubmission;