import {
  getCheckWfarActions,
  postCommentActions,
  changeCheckStatusActions,
  updateCommentActions,
  deleteCommentActions,
} from "./checkWfarReducers";

export const getCheckWfar = (wfar_id = 2) => {
  return async (dispatch, getState) => {
    let url = `/api/retrieve-wfar-per-user/${wfar_id}/`;

    const {
      login: { userInfo },
    } = getState();

    try {
      dispatch(getCheckWfarActions.getCheckWfarRequest());

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
        getCheckWfarActions.getCheckWfarSuccess({
          wfar: data,
        })
      );
    } catch (error) {
      dispatch(getCheckWfarActions.getCheckWfarFail({ error: error.message }));
    }
  };
};

export const postComment = (obj) => {
  return async (dispatch, getState) => {
    let url = "/api/create-comment-to-wfar/";

    try {
      dispatch(postCommentActions.postCommentRequest());

      const {
        login: { userInfo },
      } = getState();

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
        console.log(data);
        throw new Error(errorMessage);
      }
      const data = await response.json();

      dispatch(postCommentActions.postCommentSuccess({ success: data.detail }));
    } catch (error) {
      console.log(error);
      dispatch(postCommentActions.postCommentFail({ error: error.message }));
    }
  };
};

export const changeCheckStatus = (obj, statusWithRevision = 3) => {
  return async (dispatch, getState) => {
    let url = "/api/update-wfar-status/3/";
    if (statusWithRevision == 4) {
      url = "/api/update-wfar-status/4/";
    }
    try {
      dispatch(changeCheckStatusActions.changeCheckStatusRequest());

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
        changeCheckStatusActions.changeCheckStatusSuccess({
          success: data.detail,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        changeCheckStatusActions.changeCheckStatusFail({ error: error.message })
      );
    }
  };
};

export const updateComment = (obj, comment_id) => {
  return async (dispatch, getState) => {
    let url = `/api/update-comment/${comment_id}/`;

    try {
      dispatch(updateCommentActions.updateCommentRequest());

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
        updateCommentActions.updateCommentSuccess({ success: data.detail })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        updateCommentActions.updateCommentFail({ error: error.message })
      );
    }
  };
};

export const deleteComment = (comment_id) => {
  return async (dispatch, getState) => {
    let url = `/api/delete-comment/${comment_id}/`;

    try {
      dispatch(deleteCommentActions.deleteCommentRequest());

      const {
        login: { userInfo },
      } = getState();

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
        console.log(data);
        throw new Error(errorMessage);
      }
      const data = await response.json();

      dispatch(
        deleteCommentActions.deleteCommentSuccess({ success: data.detail })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        deleteCommentActions.deleteCommentFail({ error: error.message })
      );
    }
  };
};
