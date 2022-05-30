import {
  getFacultiesActions,
  changeUserTypeActions,
  getAreaChairsActions,
  getDepartmentHeadsActions,
  getUnassignedFacultiesActions,
  getAssignedFacultiesActions,
  unassignedFacultyActions,
  assignedFacultyActions,
} from "./manageFacultiesReducers";

export const getFaculties = (search = "") => {
  return async (dispatch, getState) => {
    let url = `/api/retrieve-all-normal-faculty-user/${search}`;

    const {
      login: { userInfo },
    } = getState();

    if (!userInfo.isAdmin) {
      url = `/api/retrieve-all-assigned-faculty-for-area-chair-head/${userInfo.id}/${search}`;
    }
    try {
      dispatch(getFacultiesActions.getFacultiesRequest());

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
        getFacultiesActions.getFacultiesSuccess({
          faculties: data,
        })
      );
    } catch (error) {
      dispatch(getFacultiesActions.getFacultiesFail({ error: error.message }));
    }
  };
};

export const getAreaChairs = (search = "") => {
  return async (dispatch, getState) => {
    let url = `/api/retrieve-all-area-chair-user/${search}`;

    const {
      login: { userInfo },
    } = getState();

    try {
      dispatch(getAreaChairsActions.getAreaChairsRequest());

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
        getAreaChairsActions.getAreaChairsSuccess({
          areachairs: data,
        })
      );
    } catch (error) {
      dispatch(
        getAreaChairsActions.getAreaChairsFail({ error: error.message })
      );
    }
  };
};

export const getDepartmentHeads = (search = "") => {
  return async (dispatch, getState) => {
    let url = `/api/retrieve-all-department-head-user/${search}`;

    const {
      login: { userInfo },
    } = getState();

    try {
      dispatch(getDepartmentHeadsActions.getDepartmentHeadsRequest());

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
        getDepartmentHeadsActions.getDepartmentHeadsSuccess({
          departmentheads: data,
        })
      );
    } catch (error) {
      dispatch(
        getDepartmentHeadsActions.getDepartmentHeadsFail({
          error: error.message,
        })
      );
    }
  };
};

export const getUnassignedFaculties = (search = "") => {
  return async (dispatch, getState) => {
    let url = `/api/retrieve-all-unassigned-faculty/${search}`;

    const {
      login: { userInfo },
    } = getState();

    try {
      dispatch(getUnassignedFacultiesActions.getUnassignedFacultiesRequest());

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
        getUnassignedFacultiesActions.getUnassignedFacultiesSuccess({
          unassignedFaculties: data,
        })
      );
    } catch (error) {
      dispatch(
        getUnassignedFacultiesActions.getUnassignedFacultiesFail({
          error: error.message,
        })
      );
    }
  };
};

export const getAssignedFaculties = (user_id, search = "") => {
  return async (dispatch, getState) => {
    let url = `/api/retrieve-all-assigned-faculty/${user_id}/${search}`;

    const {
      login: { userInfo },
    } = getState();

    try {
      dispatch(getAssignedFacultiesActions.getAssignedFacultiesRequest());

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
        getAssignedFacultiesActions.getAssignedFacultiesSuccess({
          assignedFaculties: data,
        })
      );
    } catch (error) {
      dispatch(
        getAssignedFacultiesActions.getAssignedFacultiesFail({
          error: error.message,
        })
      );
    }
  };
};

export const changeUserType = (obj) => {
  return async (dispatch, getState) => {
    let url = "/api/change-user-type/";

    try {
      dispatch(changeUserTypeActions.changeUserTypeRequest());

      const {
        login: { userInfo },
      } = getState();

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
        console.log(data);
        throw new Error(errorMessage);
      }
      const data = await response.json();

      dispatch(
        changeUserTypeActions.changeUserTypeSuccess({ success: data.detail })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        changeUserTypeActions.changeUserTypeFail({ error: error.message })
      );
    }
  };
};

export const unassignedFaculty = (obj) => {
  return async (dispatch, getState) => {
    let url = "/api/unassigned-faculty/";

    try {
      dispatch(unassignedFacultyActions.unassignedFacultyRequest());

      const {
        login: { userInfo },
      } = getState();

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
        console.log(data);
        throw new Error(errorMessage);
      }
      const data = await response.json();

      dispatch(
        unassignedFacultyActions.unassignedFacultySuccess({
          success: data.detail,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        unassignedFacultyActions.unassignedFacultyFail({ error: error.message })
      );
    }
  };
};

export const assignedFaculty = (obj) => {
  return async (dispatch, getState) => {
    let url = "/api/assigned-faculty/";

    try {
      dispatch(assignedFacultyActions.assignedFacultyRequest());

      const {
        login: { userInfo },
      } = getState();

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
        console.log(data);
        throw new Error(errorMessage);
      }
      const data = await response.json();

      dispatch(
        assignedFacultyActions.assignedFacultySuccess({
          success: data.detail,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        assignedFacultyActions.assignedFacultyFail({ error: error.message })
      );
    }
  };
};
