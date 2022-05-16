import {
    myWfarFetchActions,
    myWfarsArchivedActions,
    wfarSemestersActions,
    myWfarSubmissionActions,
    myWfarUnsubmissionActions,
    myWfarRefreshActions,
    myWfarEntryArchiveActions,
    myWfarEntryUnarchiveActions,
    myWfarEntryCreateActions
} from './myWfarReducers';

import Swal from 'sweetalert2';

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

export const submitWfar = (id, weekNo) => {
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
            Swal.fire({
                html:
                    '<h4>WFAR Submitted!</h4>',
                icon: 'success',
                confirmButtonColor: '#BE5A40'
            })

            dispatch(myWfarRefreshActions.alertNewChange());
        } catch (error) {
            dispatch(myWfarSubmissionActions.requestFailed({ error: error.message }));
            Swal.fire({
                html:
                    '<h4>' + error.message+'</h4>',
                icon: 'error',
                confirmButtonColor: '#BE5A40'
            })
        }
    }
}

export const unsubmitWfar = (id, weekNo) => {

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

            Swal.fire({
                html:
                    '<h4>Your WFAR for week ' + weekNo + ' has been unsubmitted.</h4>',
                icon: 'success',
                confirmButtonColor: '#BE5A40'
            })

            dispatch(myWfarRefreshActions.alertNewChange());
        } catch (error) {
            dispatch(myWfarUnsubmissionActions.requestFailed({ error: error.message }));
            Swal.fire({
                html:
                    '<h4>' + error.message + '</h4>',
                icon: 'success',
                confirmButtonColor: '#BE5A40'
            })
        }
    }
}

export const archiveWfarEntry = (id) => {

    return async (dispatch, getState) => {
        let url = `/api/myWfar/entry/archive/${id}/`;

        try {
            dispatch(myWfarEntryArchiveActions.sendRequest());

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
            dispatch(myWfarEntryArchiveActions.requestSuccessfullyCompleted());
            dispatch(myWfarRefreshActions.alertNewChange());

            Swal.fire({
                html:
                    '<h4>The WFAR entry has been archived!</h4>',
                icon: 'success',
                confirmButtonColor: '#BE5A40'
            })
        } catch (error) {
            dispatch(myWfarEntryArchiveActions.requestFailed({ error: error.message }));

            Swal.fire({
                html:
                    '<h4>' + error.message + '</h4>',
                icon: 'error',
                confirmButtonColor: '#BE5A40'
            })
        }
    }
}
export const restoreWfarEntry = (id) => {

    return async (dispatch, getState) => {
        let url = `/api/myWfar/entry/unarchive/${id}/`;

        try {
            dispatch(myWfarEntryUnarchiveActions.sendRequest());

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
            dispatch(myWfarEntryUnarchiveActions.requestSuccessfullyCompleted());
            dispatch(myWfarRefreshActions.alertNewChange());
            Swal.fire({
                html:
                    '<h4>The WFAR entry has been restored!</h4>',
                icon: 'success',
                confirmButtonColor: '#BE5A40'
            })
        } catch (error) {
            dispatch(myWfarEntryUnarchiveActions.requestFailed({ error: error.message }));

            Swal.fire({
                html:
                    '<h4>' + error.message + '</h4>',
                icon: 'error',
                confirmButtonColor: '#BE5A40'
            })
        }
    }
}

export const createWfarEntry = (wfarId, weekNo, entry, formData) => {

    return async (dispatch, getState) => {
        let url = `/api/myWfar/entry/wfar=${wfarId}/create/`;

        try {
            dispatch(myWfarEntryCreateActions.sendRequest());

            const {
                login: { userInfo },
            } = getState();

            console.log("entry: ");
            console.log(entry);

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(entry),
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
            dispatch(myWfarEntryCreateActions.requestSuccessfullyCompleted());
            dispatch(myWfarRefreshActions.alertNewChange());


            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + userInfo.token);


            let url2 = `/api/myWfar/entry/upload_attachments/`;
            const response2 = await fetch(url2, {
                method: "POST",
                body: formData,
                headers: myHeaders
            });


            const data2 = await response2.json();
            console.log(data2);

            if (!response2.ok) {
                const data = await response2.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            Swal.fire({
                html:
                    '<h4>Your entry for WFAR week ' + weekNo + ' has been recorded!</h4>',
                icon: 'success',
                confirmButtonColor: '#BE5A40'
            })

            console.log(data);
        } catch (error) {
            dispatch(myWfarEntryCreateActions.requestFailed({ error: error.message }));

            Swal.fire({
                html:
                    '<h4>' + error.message + '</h4>',
                icon: 'error',
                confirmButtonColor: '#BE5A40'
            })
        }
    }
}