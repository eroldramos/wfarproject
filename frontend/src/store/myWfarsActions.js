import { myWfarsActions, myWfarsArchivedActions, wfarSemestersActions } from './myWfarReducers';

export const retrieveWfars = (filterSemester) => {
    return async (dispatch, getState) => {
        let url = "/api/myWfar/?faculty_id=1&semester_id=" + filterSemester;

        try {
            dispatch(myWfarsActions.retrieveRequest());

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
            dispatch(myWfarsActions.retrieveSuccessfully({ wfars: data }));
            console.log(data)
        } catch (error) {
            console.log(error.message)
            dispatch(myWfarsActions.retrieveFail({ error: error.message }));
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