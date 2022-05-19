import SemesterFilter from "../components/FacultySubmissions/SemesterFilter/SemesterFilter";
import {
    wfarRetrieveOverviewActions
} from "./wfarReducers";
// import axios from 'axios'

export const retrieveWfarsOverview = (filterSemester, filterPage, filterSort, filterSearch) => {
    return async (dispatch, getState) => {
        // let url = `http://127.0.0.1:8000/api/wfar/retrieveWfarOverview/semester=${filterSemester}/page=${filterPage}`;

        let url = `/api/wfar/retrieveWfarOverview/semester=${filterSemester}/page=${filterPage}/sort=${filterSort}`;
        if (filterSearch !== '') {
            url = `/api/wfar/retrieveWfarOverview/semester=${filterSemester}/page=${filterPage}/sort=${filterSort}/search=${filterSearch}`;
        }

        try {
            dispatch(wfarRetrieveOverviewActions.retrieveRequest());

            const {
                login: { userInfo },
            } = getState();

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ "faculty_checker_id": 1 }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token,
                }
            });

            console.log("user info " + userInfo.token);
            if (!response.ok) {
                console.log("error encountered here");
                const data = await response.json();
                console.log("error encountered here2");
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log(data)
            dispatch(wfarRetrieveOverviewActions.retrieveSuccessfully({
                facultiesWithWfars: data.faculties,
                pageNo: data.page_no,
                noOfPages: data.no_of_pages,
                firstPage: data.first_page,
                lastPage: data.last_page,
                weekBrackets: data.week_brackets,
                semesterNoOfWeeks: data.semester_no_of_weeks,
                currentWeekNo: data.current_week_no
            }));

            console.log(data)

            fetch("/api/wfar/overview/semester=1/sort=1/print",
                {
                    method: "POST",
                    body: JSON.stringify({ "faculty_checker_id": 1 }),
                    headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + userInfo.token }
                }).then(response => response.blob()).then(response => {

                    let date = new Date();

                    const fileURL = URL.createObjectURL(response);
                    let a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = fileURL;
                    
                    const timestamp = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate() + "" +
                        date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();

                    console.log(timestamp);
                    a.download = "WFAR_Overview_" + timestamp+".pdf";
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(fileURL);
                })


            // const file = new Blob([data2], { type: "application/pdf" });
            // const fileURL = URL.createObjectURL(file);
            // const pdfWindow = window.open();
            // pdfWindow.location.href = fileURL;

        } catch (error) {
            console.log("error encountered here3");
            console.log(error.message)
            dispatch(wfarRetrieveOverviewActions.retrieveFail({ error: error.message }));
        }
    }
}

