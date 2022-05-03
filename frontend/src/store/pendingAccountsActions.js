import {
  getPendingAccountsActions,
  acceptAccountsActions,
} from "./pendingAccountsReducers";

export const getPendingAccounts = (search = "") => {
  return async (dispatch, getState) => {
    let url = `/api/retrieve-pending-faculties/${search}`;

    const {
      login: { userInfo },
    } = getState();

    try {
      dispatch(getPendingAccountsActions.pendingAccountRequest());

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

      dispatch(
        getPendingAccountsActions.pendingAccountSuccess({
          pendingAccounts: data,
        })
      );
    } catch (error) {
      dispatch(
        getPendingAccountsActions.pendingAccountFail({ error: error.message })
      );
    }
  };
};

export const acceptAccounts = (arrayId) => {
  return async (dispatch, getState) => {
    let url = "/api/accept-faculty-account/";
    const {
      login: { userInfo },
    } = getState();
    try {
      dispatch(acceptAccountsActions.acceptAccountRequest());

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ acceptedAccounts: arrayId }),
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
      dispatch(
        acceptAccountsActions.acceptAccountSuccess({ success: data.detail })
      );
    } catch (error) {
      dispatch(
        acceptAccountsActions.acceptAccountFail({ error: error.message })
      );
    }
  };
};

export const acceptAccountResetValue = () => {
  return async (dispatch, getState) => {
    dispatch(acceptAccountsActions.acceptAccountReset());
  };
};
