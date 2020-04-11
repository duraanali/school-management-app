import { axiosWithAuth } from "../utility/axiosWithAuth";

export const FETCH_TEACHERS_DATA_START = "FETCH_TEACHERS_DATA_START";
export const FETCH_TEACHERS_DATA_SUCCESS = "FETCH_TEACHERS_DATA_SUCCESS";
export const FETCH_TEACHERS_DATA_FAILURE = "FETCH_TEACHERS_DATA_FAILURE";
export const DELETE_TEACHERS_DATA_SUCCESS = "DELETE_TEACHERS_DATA_SUCCESS";

export const fetchTeachersBegin = () => ({
  type: FETCH_TEACHERS_DATA_START,
});

export const fetchTeachersSuccess = (teachers) => ({
  type: FETCH_TEACHERS_DATA_SUCCESS,
  payload: { teachers },
});

export const fetchTeachersFailure = (error) => ({
  type: FETCH_TEACHERS_DATA_FAILURE,
  payload: { error },
});

export const deleteTeachersSuccess = (teachers) => ({
  type: DELETE_TEACHERS_DATA_SUCCESS,
  payload: { teachers },
});


export function fetchTeachers() {
  return (dispatch) => {
    dispatch(fetchTeachersBegin());
    return axiosWithAuth()
      .get(`https://alifcloud.herokuapp.com/api/teachers/all`)
      .then((res) => {
        
        dispatch(fetchTeachersSuccess(res.data));
      })
      .catch((error) => dispatch(fetchTeachersFailure(error)));
  };
}

export function deleteTeacher() {
  return (dispatch) => {
    dispatch(deleteTeachersSuccess());
    return axiosWithAuth()
      .delete(`https://alifcloud.herokuapp.com/api/teachers/${3}`)
      .then((res) => {

        dispatch(deleteTeachersSuccess(res.data));
      })
      .catch((error) => dispatch(fetchTeachersFailure(error)));
  };
}

