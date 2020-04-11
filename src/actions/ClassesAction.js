import { axiosWithAuth } from "../utility/axiosWithAuth";

export const FETCH_CLASSES_DATA_START = "FETCH_CLASSES_DATA_START";
export const FETCH_CLASSES_DATA_SUCCESS = "FETCH_CLASSES_DATA_SUCCESS";
export const FETCH_CLASSES_DATA_FAILURE = "FETCH_CLASSES_DATA_FAILURE";
export const DELETE_CLASSES_DATA_SUCCESS = "DELETE_CLASSES_DATA_SUCCESS";

export const fetchClassesBegin = () => ({
  type: FETCH_CLASSES_DATA_START,
});

export const fetchClassesSuccess = (classes) => ({
  type: FETCH_CLASSES_DATA_SUCCESS,
  payload: { classes },
});

export const fetchClassesFailure = (error) => ({
  type: FETCH_CLASSES_DATA_FAILURE,
  payload: { error },
});

export const deleteClassesSuccess = (classes) => ({
  type: DELETE_CLASSES_DATA_SUCCESS,
  payload: { classes },
});


export function fetchClasses() {
  return (dispatch) => {
    dispatch(fetchClassesBegin());
    return axiosWithAuth()
      .get(`https://alifcloud.herokuapp.com/api/classes/`)
      .then((res) => {
        
        dispatch(fetchClassesSuccess(res.data));
      })
      .catch((error) => dispatch(fetchClassesFailure(error)));
  };
}

export function deleteClass(id) {
  return (dispatch) => {
    dispatch(deleteClassesSuccess());
    return axiosWithAuth()
      .delete(`https://alifcloud.herokuapp.com/api/classes/${id}`)
      .then((res) => {
        console.log("in action", res.data)
        dispatch(deleteClassesSuccess(res.data));
      })
      .catch((error) => dispatch(fetchClassesFailure(error)));
  };
}

