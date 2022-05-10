import { getAllSemsActions, addSemActions } from "./sampleReducers";

export const getAllSems = () => {
  return async (dispatch, getState) => {
    let url = "/api/get-all-sems/";

    try {
      dispatch(getAllSemsActions.getSemsRequest());

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + userInfo.token,
        },
      });

      if (!response.ok) {
        //{"detail": "Something went wrong!"}
        const data = await response.json();
        let errorMessage = data.detail;
        throw new Error(errorMessage);
      }
      //if dont receive error
      const data = await response.json();

      dispatch(getAllSemsActions.getSemsSuccess({ allSems: data }));
    } catch (error) {
      dispatch(getAllSemsActions.getSemsFail({ error: error.message }));
    }
  };
};

export const addSem = (obj) => {
  return async (dispatch, getState) => {
    let url = "/api/add-sem/";

    try {
      dispatch(addSemActions.addSemRequest());

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
        //   {"detail": "Added sem successfully!!!!"}
        const data = await response.json();
        let errorMessage = data.detail;
        console.log(data);
        throw new Error(errorMessage);
      }
      //if dont receive error
      const data = await response.json();

      dispatch(addSemActions.addSemSuccess({ success: data.detail }));
    } catch (error) {
      console.log(error);
      dispatch(addSemActions.addSemFail({ error: error.message }));
    }
  };
};

// export const getPendingAccounts = (search = "") => {
//   return async (dispatch, getState) => {
//     let url = `/api/retrieve-pending-faculties/${search}`;

//     const {
//       login: { userInfo },
//     } = getState();

//     try {
//       dispatch(getPendingAccountsActions.pendingAccountRequest());

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + userInfo.token,
//         },
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         let errorMessage = data.detail;
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();

//       dispatch(
//         getPendingAccountsActions.pendingAccountSuccess({
//           pendingAccounts: data,
//         })
//       );
//     } catch (error) {
//       dispatch(
//         getPendingAccountsActions.pendingAccountFail({ error: error.message })
//       );
//     }
//   };
// };
