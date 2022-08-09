import SemesterFilter from "../components/FacultySubmissions/SemesterFilter/SemesterFilter";
import {
    wfarRetrieveOverviewActions,
    wfarPrintOverviewActions,
    wfarActiveSemesterActions,
    wfarPrintIndividualActions,
    weeklyWfarRetrieveActions,
    weeklyWfarPrintActions
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

            const userId = userInfo.id;

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ "faculty_checker_id": userId }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token,
                }
            });

            if (!response.ok) {
                console.log("error encountered here");
                const data = await response.json();
                console.log("error encountered here2");
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            const data = await response.json();
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


        } catch (error) {
            dispatch(wfarRetrieveOverviewActions.retrieveFail({ error: error.message }));
        }
    }
}

export const printWfarsOverview = (filterSemester, filterSort) => {
    return async (dispatch, getState) => {

        try {
            dispatch(wfarPrintOverviewActions.sendRequest());

            const {
                login: { userInfo },
            } = getState();

            let userId = userInfo.id;
            // if (userInfo.isAdmin) {
            //     userId = 0
            // }

            fetch(
              `/api/wfar/overview/semester=${filterSemester}/sort=${filterSort}/print`,
              {
                method: "POST",
                body: JSON.stringify({ faculty_checker_id: userId }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + userInfo.token,
                },
              }
            )
              .then((response) => response.blob())
              .then((response) => {
                let date = new Date();

                const fileURL = URL.createObjectURL(response);
                let a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = fileURL;

                const timestamp =
                  date.getFullYear() +
                  "" +
                  (date.getMonth() + 1) +
                  "" +
                  date.getDate() +
                  "" +
                  date.getHours() +
                  "" +
                  date.getMinutes() +
                  "" +
                  date.getSeconds();

                console.log(timestamp);
                a.download = "WFAR_Overview_" + timestamp + ".pdf";
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(fileURL);
                dispatch(wfarPrintOverviewActions.printSuccessfully());
              });

        } catch (error) {
            dispatch(wfarPrintOverviewActions.requestFail({ error: "Sorry an error has occured while trying to export this table to pdf. Please try again later." }));
        }
    }
}

export const printWfarIndividual = (wfar_id) => {
    return async (dispatch, getState) => {

        try {
            dispatch(wfarPrintIndividualActions.sendRequest());

            const {
                login: { userInfo },
            } = getState();

            fetch(`/api/wfar/individual/print`,
                {
                    method: "POST",
                    body: JSON.stringify({ "wfar_id": wfar_id }),
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
                    a.download = "WFAR_" + timestamp + ".pdf";
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(fileURL);
                    dispatch(wfarPrintIndividualActions.printSuccessfully());
                })

        } catch (error) {
            dispatch(wfarPrintIndividualActions.requestFail({ error: "Sorry an error has occured while trying to export this WFAR to pdf. Please try again later." }));
        }
    }
}


export const printWeeklyWfar = (filterSemester, filterWeek, filterStatus, filterSort) => {
    return async (dispatch, getState) => {

        console.log("filter status");
        console.log(filterStatus);

        try {
            dispatch(weeklyWfarPrintActions.sendRequest());

            const { login: { userInfo }, } = getState();

            fetch(`/api/wfar/semester=${filterSemester}/week=${filterWeek}/wfar_status=${filterStatus}/sort=${filterSort}/print`,
                {
                    method: "POST",
                    body: JSON.stringify({ "faculty_checker_id": userInfo.id }),
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
                    a.download = "WFAR_" + timestamp + ".pdf";
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(fileURL);
                    dispatch(weeklyWfarPrintActions.printSuccessfully());
                })

        } catch (error) {
            dispatch(weeklyWfarPrintActions.requestFail({ error: "Sorry an error has occured while trying to export this table to PDF. Please try again later." }));
        }
    }
}

export const retrieveActiveSemester = () => {
    return async (dispatch, getState) => {
        // let url = `http://127.0.0.1:8000/api/wfar/retrieveWfarOverview/semester=${filterSemester}/page=${filterPage}`;

        let url = `/api/retrieve-active-sem/`;

        try {
            dispatch(wfarActiveSemesterActions.retrieveRequest());

            const {
                login: { userInfo },
            } = getState();

            const response = await fetch(url, {
                method: "GET",
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
            dispatch(wfarActiveSemesterActions.retrieveSuccessfully({
                semester: data
            }));

            console.log(data);

        } catch (error) {
            console.log("error encountered here3");
            console.log(error.message)
            dispatch(wfarActiveSemesterActions.retrieveFail({ error: error.message }));
        }
    }
}

export const retrieveWeeklyWfars = (filterSemester, filterWeek, status, filterPage, filterSort, filterSearch) => {
    return async (dispatch, getState) => {

        let url = `/api/wfar/semester=${filterSemester}/week=${filterWeek}/wfar_status=${status}/page=${filterPage}/sort=${filterSort}`;
        if (filterSearch !== '') {
            url = `/api/wfar/semester=${filterSemester}/week=${filterWeek}/wfar_status=${status}/page=${filterPage}/sort=${filterSort}/search=${filterSearch}`;
        }

        try {
            dispatch(weeklyWfarRetrieveActions.retrieveRequest());

            const {
                login: { userInfo },
            } = getState();

            console.log("THE USER INFO IS ___________");
            console.log(userInfo);

            const userId = userInfo.id;

            console.log("USER ID ___________");
            console.log(userId);
            
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ "faculty_checker_id": userId }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token,
                }
            });

            if (!response.ok) {
                console.log("error encountered here");
                const data = await response.json();
                console.log("error encountered here2");
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log(data)
            dispatch(weeklyWfarRetrieveActions.retrieveSuccessfully({
                facultiesWithWfars: data.faculties,
                pageNo: data.page_no,
                noOfPages: data.no_of_pages,
                firstPage: data.first_page,
                lastPage: data.last_page
            }));

            console.log(data);

        } catch (error) {
            console.log("error encountered here3");
            console.log(error.message)
            dispatch(weeklyWfarRetrieveActions.retrieveFail({ error: error.message }));
        }
    }
}