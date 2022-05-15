import {
    myWfarFetchActions,
    myWfarsArchivedActions,
    wfarSemestersActions,
    myWfarSubmissionActions,
    myWfarUnsubmissionActions
} from './myWfarReducers';

export const retrieveWfars = (filterSemester) => {
    return async (dispatch, getState) => {
        let url = "/api/myWfar/?faculty_id=1&semester_id=" + filterSemester;

        try {
            dispatch(myWfarFetchActions.retrieveRequest());

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

            if (!response.ok) {
                const data = await response.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            dispatch(myWfarFetchActions.retrieveSuccessfully({ wfars: data }));
            console.log(data)
        } catch (error) {
            console.log(error.message)
            dispatch(myWfarFetchActions.retrieveFail({ error: error.message }));
        }
    }
}

export const retrieveArchivedWfars = (filterSemester) => {
    return async (dispatch, getState) => {
        let url = "/api/myWfar/archived/?faculty_id=1&semester_id=" + filterSemester;

        try {
            dispatch(myWfarsArchivedActions.retrieveRequest());

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

            if (!response.ok) {
                const data = await response.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            dispatch(myWfarsArchivedActions.retrieveSuccessfully({ archivedEntries: data }));
            console.log(data)
        } catch (error) {
            console.log(error.message)
            dispatch(myWfarsArchivedActions.retrieveFail({ error: error.message }));
        }
    }
}

export const retrieveWfarsSemestersList = () => {
    return async (dispatch, getState) => {
        let url = "/api/retrieve-all-sem-list";

        try {
            dispatch(wfarSemestersActions.retrieveRequest());

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

            if (!response.ok) {
                const data = await response.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            dispatch(wfarSemestersActions.retrieveSuccessfully({ semesters: data }));
            console.log(data)
        } catch (error) {
            console.log(error.message)
            dispatch(wfarSemestersActions.retrieveFail({ error: error.message }));
        }
    }
}

export const submitWfar = (id) => {
    console.log("hello");

    return async (dispatch, getState) => {
        let url = `/api/myWfar/submit/${id}/`;

        console.log("hello2");
        try {
            dispatch(myWfarSubmissionActions.sendRequest());

            const {
                login: { userInfo },
            } = getState();

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token,
                }
            });

            if (!response.ok) {
                const data = await response.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            dispatch(myWfarSubmissionActions.requestSuccessfullyCompleted());
            console.log(data)
        } catch (error) {
            console.log(error.message)
            dispatch(myWfarSubmissionActions.requestFailed({ error: error.message }));
        }
    }
}

export const unsubmitWfar = (id) => {

    return async (dispatch, getState) => {
        let url = `/api/myWfar/unsubmit/${id}/`;

        try {
            dispatch(myWfarUnsubmissionActions.sendRequest());

            const {
                login: { userInfo },
            } = getState();

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token,
                }
            });

            if (!response.ok) {
                const data = await response.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            dispatch(myWfarUnsubmissionActions.requestSuccessfullyCompleted());
            console.log(data)
        } catch (error) {
            console.log(error.message)
            dispatch(myWfarUnsubmissionActions.requestFailed({ error: error.message }));
        }
    }
}