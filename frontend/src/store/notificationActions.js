import { getNotificationAction } from "./notificationReducer";

export const getAllNotification = (user_id) => {
    return async (dispatch, getState) => {
        let url = "/api/notifications/?user_id="+user_id;

        try {
            dispatch(getNotificationAction.getNotificationRequest());

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
            dispatch(getNotificationAction.getNotificationSuccess({ notifications: data }));
        } catch (error) {
            dispatch(getNotificationAction.getNotificationFail({error:error}));
        }
    }
}