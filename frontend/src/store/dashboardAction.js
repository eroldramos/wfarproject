import { getAllWFARinThisWeekAction, getActiveSemAction, getAllUsersAction } from "./dashboardReducer";

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
                    Authorization: "Bearer " + userInfo.token,
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
                    Authorization: "Bearer " + userInfo.token,
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
                    Authorization: "Bearer " + userInfo.token,
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
