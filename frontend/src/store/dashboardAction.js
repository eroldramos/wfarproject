import { getAllWFARinThisWeekAction, getActiveSemAction, getAllUsersAction, getWFARwholeSemAction, getWFARCommentsAction } from "./dashboardReducer";

export const getAllWFARinThisWeek = () => {
    return async (dispatch, getState) => {
        let url = "/api/wfar-this-week/";

        const {
            login: { userInfo },
        } = getState();

        try {
            dispatch(getAllWFARinThisWeekAction.getAllWfarThisWeekRequest());
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }
            const data = await response.json();
            dispatch(getAllWFARinThisWeekAction.getAllWfarThisWeekSuccess({ wfar: data }));
        } catch (error) {
            dispatch(getAllWFARinThisWeekAction.getAllWfarThisWeekFail({ error: error }));
        }
    };
};

export const getAllWFARwholeSem = (faculty_id) => {
    return async (dispatch, getState) => {
        let url = "/api/wfar-whole-sem/?faculty_id="+faculty_id;

        try {
            dispatch(getWFARwholeSemAction.getWFARwholeSemRequest());

            const {
                login: { userInfo },
            } = getState();

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const data = await response.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            dispatch(getWFARwholeSemAction.getWFARwholeSemSuccess({ wfar: data }));
        } catch (error) {
            dispatch(getWFARwholeSemAction.getWFARwholeSemFail({error:error}));
        }
    }
}

export const getAllWFARComments = (wfar_id) => {
    return async (dispatch, getState) => {
        let url = "/api/wfar-comments/?wfar_id="+wfar_id;

        try {
            dispatch(getWFARCommentsAction.getWFARCommentsRequest());

            const {
                login: { userInfo },
            } = getState();

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const data = await response.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            dispatch(getWFARCommentsAction.getWFARCommentsSuccess({ comment: data }));
        } catch (error) {
            dispatch(getWFARCommentsAction.getWFARCommentsFail({error:error}));
        }
    }
}


export const getAllUser = () => {
    return async (dispatch, getState) => {
        let url = "/api/all-user-for-dashboard/";

        const {
            login: { userInfo },
        } = getState();

        try {
            dispatch(getAllUsersAction.getAllUsersRequest());
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }
            const data = await response.json();
            dispatch(getAllUsersAction.getAllUsersSuccess({ users: data }));
        } catch (error) {
            dispatch(getAllUsersAction.getAllUsersFail({ error: error }));
        }
    };
};




export const getActiveSem = () => {
    return async (dispatch, getState) => {
        let url = "/api/active-semester/";

        const {
            login: { userInfo },
        } = getState();

        try {
            dispatch(getActiveSemAction.getActiveSemRequest());
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const data = await response.json();
                let errorMessage = data.detail;
                throw new Error(errorMessage);
            }
            const data = await response.json();
            dispatch(getActiveSemAction.getActiveSemSuccess({ activeSem: data }));
        } catch (error) {
            dispatch(getActiveSemAction.getActiveSemFail({ error: error }));
        }
    };
};
