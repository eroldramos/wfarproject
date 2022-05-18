import {
  createSemActions,
  getSemsActions,
  getSemDetailsActions,
  updateSemActions,
  getArchivedSemsActions,
  archiveSemActions,
  restoreSemActions,
  activateSemActions,
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

export const getArchivedSems = (search) => {
  return async (dispatch, getState) => {
    let url = `/api/retrieve-all-archived-sem/${search}`;
    const {
      login: { userInfo },
    } = getState();
    try {
      dispatch(getArchivedSemsActions.getArchivedSemsRequest());

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
        getArchivedSemsActions.getArchivedSemsSuccess({ semesters: data })
      );
    } catch (error) {
      dispatch(
        getArchivedSemsActions.getArchivedSemsFail({ error: error.message })
      );
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

export const archiveSem = (semId) => {
  return async (dispatch, getState) => {
    let url = `/api/archive-restore-sem/${semId}/`;
    const {
      login: { userInfo },
    } = getState();
    try {
      dispatch(archiveSemActions.archiveSemRequest());

      const response = await fetch(url, {
        method: "DELETE",
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
      dispatch(archiveSemActions.archiveSemSuccess({ success: data.detail }));
    } catch (error) {
      dispatch(archiveSemActions.archiveSemFail({ error: error.message }));
    }
  };
};

export const restoreSem = (semId) => {
  return async (dispatch, getState) => {
    let url = `/api/archive-restore-sem/${semId}/`;
    const {
      login: { userInfo },
    } = getState();
    try {
      dispatch(restoreSemActions.restoreSemRequest());

      const response = await fetch(url, {
        method: "PUT",
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
      dispatch(restoreSemActions.restoreSemSuccess({ success: data.detail }));
    } catch (error) {
      dispatch(restoreSemActions.restoreSemFail({ error: error.message }));
    }
  };
};

export const activateSem = (semId) => {
  return async (dispatch, getState) => {
    let url = `/api/activate-sem/${semId}/`;
    const {
      login: { userInfo },
    } = getState();
    try {
      dispatch(activateSemActions.activateSemRequest());

      const response = await fetch(url, {
        method: "PUT",
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
      dispatch(activateSemActions.activateSemSuccess({ success: data.detail }));
    } catch (error) {
      dispatch(activateSemActions.activateSemFail({ error: error.message }));
    }
  };
};
