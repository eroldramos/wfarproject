import {
  createSemActions,
  getSemsActions,
  getSemDetailsActions,
  updateSemActions,
} from "./manageSemReducers";
export const createSem = (obj) => {
  return async (dispatch, getState) => {
    let url = "/api/create-sem/";
    const {
      login: { userInfo },
    } = getState();
    try {
      dispatch(createSemActions.createSemRequest());

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
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
      dispatch(createSemActions.createSemSuccess({ success: data.detail }));
    } catch (error) {
      dispatch(createSemActions.createSemFail({ error: error.message }));
    }
  };
};

export const createSemReset = () => {
  return async (dispatch, getState) => {
    dispatch(createSemActions.createSemReset());
  };
};

export const getSems = (search) => {
  return async (dispatch, getState) => {
    let url = `/api/retrieve-all-sem/${search}`;
    const {
      login: { userInfo },
    } = getState();
    try {
      dispatch(getSemsActions.getSemsRequest());

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
      dispatch(getSemsActions.getSemsSuccess({ semesters: data }));
    } catch (error) {
      dispatch(getSemsActions.getSemsFail({ error: error.message }));
    }
  };
};

export const getSemDetailsResetValue = () => {
  return async (dispatch, getState) => {
    dispatch(getSemDetailsActions.getSemDetailsReset());
  };
};

export const getSemDetails = (semId) => {
  return async (dispatch, getState) => {
    let url = `/api/retrieve-sem-details/${semId}/`;
    const {
      login: { userInfo },
    } = getState();
    try {
      dispatch(getSemDetailsActions.getSemDetailsRequest());

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
      dispatch(getSemDetailsActions.getSemDetailsSuccess({ semDetails: data }));
    } catch (error) {
      dispatch(
        getSemDetailsActions.getSemDetailsFail({ error: error.message })
      );
    }
  };
};

export const updateSem = (semId, obj) => {
  return async (dispatch, getState) => {
    let url = `/api/update-sem/${semId}/`;
    const {
      login: { userInfo },
    } = getState();
    try {
      dispatch(updateSemActions.updateSemRequest());

      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(obj),
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
      dispatch(updateSemActions.updateSemSuccess({ success: data.detail }));
    } catch (error) {
      dispatch(updateSemActions.updateSemFail({ error: error.message }));
    }
  };
};

export const updateSemResetValue = () => {
  return async (dispatch, getState) => {
    dispatch(updateSemActions.updateSemReset());
  };
};
