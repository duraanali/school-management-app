import { axiosWithAuth } from "../utility/axiosWithAuth";

export const FETCH_SETTINGS_DATA_START = "FETCH_SETTINGS_DATA_START";
export const FETCH_SETTINGS_DATA_SUCCESS = "FETCH_SETTINGS_DATA_SUCCESS";
export const FETCH_SETTINGS_DATA_FAILURE = "FETCH_SETTINGS_DATA_FAILURE";
export const DELETE_SETTINGS_DATA_SUCCESS = "DELETE_SETTINGS_DATA_SUCCESS";

export const fetchSettingsBegin = () => ({
  type: FETCH_SETTINGS_DATA_START,
});

export const fetchSettingsSuccess = (settings) => ({
  type: FETCH_SETTINGS_DATA_SUCCESS,
  payload: { settings },
});

export const fetchSettingsFailure = (error) => ({
  type: FETCH_SETTINGS_DATA_FAILURE,
  payload: { error },
});

export const deleteSettingsSuccess = (settings) => ({
  type: DELETE_SETTINGS_DATA_SUCCESS,
  payload: { settings },
});


export function fetchSettings() {
  return (dispatch) => {
    dispatch(fetchSettingsBegin());
    return axiosWithAuth()
      .get(`https://alifcloud.herokuapp.com/api/settings/`)
      .then((res) => {
        
        dispatch(fetchSettingsSuccess(res.data));
      })
      .catch((error) => dispatch(fetchSettingsFailure(error)));
  };
}

// export function deleteParent() {
//   return (dispatch) => {
//     dispatch(deleteParentsSuccess());
//     return axiosWithAuth()
//       .delete(`https://alifcloud.herokuapp.com/api/parents/${3}`)
//       .then((res) => {

//         dispatch(deleteParentsSuccess(res.data));
//       })
//       .catch((error) => dispatch(fetchParentsFailure(error)));
//   };
// }

