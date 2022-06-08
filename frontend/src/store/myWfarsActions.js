import {
    myWfarCreateActions,
    myWfarFetchActions,
    myWfarsArchivedActions,
    wfarSemestersActions,
    myWfarSubmissionActions,
    myWfarUnsubmissionActions,
    myWfarRefreshActions,
    myWfarEntryArchiveActions,
    myWfarEntryUnarchiveActions,
    myWfarEntryCreateActions,
    myWfarFetchEntryActions,
    myWfarEntryUpdateActions
} from './myWfarReducers';

import Swal from 'sweetalert2';


export const createWfar = () => {
    return async (dispatch, getState) => {
        let url = `/api/myWfar/create/`;

        try {

            dispatch(myWfarCreateActions.sendRequest());

            const {
                login: { userInfo },
            } = getState();

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({"faculty_id": userInfo.id}),
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
            dispatch(myWfarCreateActions.requestSuccessfullyCompleted());
        } catch (error) {
            dispatch(myWfarCreateActions.requestFailed({ error: error.message }));
        }
    }
}

export const retrieveWfars = (filterSemester, filterPage) => {
    return async (dispatch, getState) => {

        const {
            login: { userInfo },
        } = getState();

        let url = "/api/myWfar/?faculty_id=" + userInfo.id + "&semester_id=" + filterSemester + "&page_no=" + filterPage;

        try {
            dispatch(myWfarFetchActions.retrieveRequest());

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
            // console.log("my wfar");
            // console.log(data);
            // console.log(data.wfars);
            // console.log(data.faculties);
            // console.log(data.page_no);
            // console.log(data.no_of_pages);
            // console.log(data.first_page);
            // console.log(data.last_page);
            dispatch(myWfarFetchActions.retrieveSuccessfully({ 
                wfars: data.faculties,
                pageNo: data.page_no,
                noOfPages: data.no_of_pages,
                firstPage: data.first_page,
                lastPage: data.last_page
            }));
        } catch (error) {
            dispatch(myWfarFetchActions.retrieveFail({ error: error.message }));
        }
    }
}

export const retrieveArchivedWfars = (filterSemester) => {
    return async (dispatch, getState) => {

        const {
            login: { userInfo },
        } = getState();

        let url = "/api/myWfar/archived/?faculty_id="+ userInfo.id +"&semester_id=" + filterSemester;

        try {
            dispatch(myWfarsArchivedActions.retrieveRequest());


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
        } catch (error) {
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
        } catch (error) {
            dispatch(wfarSemestersActions.retrieveFail({ error: error.message }));
        }
    }
}

export const submitWfar = (id, weekNo) => {

    return async (dispatch, getState) => {
        let url = `/api/myWfar/submit/${id}/`;

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
                    '<h4>' + error.message + '</h4>',
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
                icon: 'warning',
                confirmButtonColor: '#BE5A40'
            })
        }
    }
}

export const createWfarEntry = (wfarId, weekNo, entry, formDataImages) => {

    return async (dispatch, getState) => {
        let url = `/api/myWfar/entry/wfar=${wfarId}/create/`;

        try {
            dispatch(myWfarEntryCreateActions.sendRequest());

            const {
                login: { userInfo },
            } = getState();

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

            let uploadUrl = `/api/myWfar/entry/${data.id}/upload_attachments/`;
            const response2 = await fetch(uploadUrl, {
                method: "POST",
                body: formDataImages,
                headers: { "Authorization": "Bearer " + userInfo.token}
            });

            const uploadData = await response2.json();

            if (!response2.ok) {
                const data = await response2.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

        } catch (error) {
            dispatch(myWfarEntryCreateActions.requestFailed({ error: error.message }));
        }
    }
}

export const updateWfarEntry = (wfarEntryId, entry, formDataImages) => {

    return async (dispatch, getState) => {
        let url = `/api/myWfar/entry/${wfarEntryId}/update/`;

        try {
            dispatch(myWfarEntryUpdateActions.sendRequest());

            const {
                login: { userInfo },
            } = getState();

            const response = await fetch(url, {
                method: "PUT",
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
            dispatch(myWfarEntryUpdateActions.requestSuccessfullyCompleted());
            dispatch(myWfarRefreshActions.alertNewChange());

            let uploadUrl = `/api/myWfar/entry/${wfarEntryId}/update_attachments/`;
            const response2 = await fetch(uploadUrl, {
                method: "POST",
                body: formDataImages,
                headers: { "Authorization": "Bearer " + userInfo.token }
            });

            const uploadData = await response2.json();

            if (!response2.ok) {
                const data = await response2.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

        } catch (error) {
            dispatch(myWfarEntryUpdateActions.requestFailed({ error: error.message }));
        }
    }
}


export const fetchWfarEntry = (id) => {

    return async (dispatch, getState) => {
        let url = `/api/myWfar/entry/${id}/`;

        try {
            dispatch(myWfarFetchEntryActions.retrieveRequest());

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
            dispatch(myWfarFetchEntryActions.retrieveSuccessfully({entry: data}));
            dispatch(myWfarRefreshActions.alertNewChange());


        } catch (error) {
            dispatch(myWfarFetchEntryActions.retrieveFail({ error: error.message }));
        }
    }
}