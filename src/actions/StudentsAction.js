import { axiosWithAuth } from "../utility/axiosWithAuth";

export const FETCH_STUDENTS_DATA_START = "FETCH_STUDENTS_DATA_START";
export const FETCH_STUDENTS_DATA_SUCCESS = "FETCH_STUDENTS_DATA_SUCCESS";
export const FETCH_STUDENTS_DATA_FAILURE = "FETCH_STUDENTS_DATA_FAILURE";
export const DELETE_STUDENTS_DATA_SUCCESS = "DELETE_STUDENTS_DATA_SUCCESS";

export const fetchStudentsBegin = () => ({
  type: FETCH_STUDENTS_DATA_START,
});

export const fetchStudentsSuccess = (students) => ({
  type: FETCH_STUDENTS_DATA_SUCCESS,
  payload: { students },
});

export const fetchStudentsFailure = (error) => ({
  type: FETCH_STUDENTS_DATA_FAILURE,
  payload: { error },
});

export const deleteStudentsSuccess = (students) => ({
  type: DELETE_STUDENTS_DATA_SUCCESS,
  payload: { students },
});


export function fetchStudents() {
  return (dispatch) => {
    dispatch(fetchStudentsBegin());
    return axiosWithAuth()
      .get(`https://alifcloud.herokuapp.com/api/students/`)
      .then((res) => {
        console.log("inside useeffect", res.data);
        dispatch(fetchStudentsSuccess(res.data));
      })
      .catch((error) => dispatch(fetchStudentsFailure(error)));
  };
}

export function deleteStudent() {
  return (dispatch) => {
    dispatch(deleteStudentsSuccess());
    return axiosWithAuth()
      .delete(`https://alifcloud.herokuapp.com/api/students/${3}`)
      .then((res) => {
        console.log("inside useeffect", res.data);
        dispatch(deleteStudentsSuccess(res.data));
      })
      .catch((error) => dispatch(fetchStudentsFailure(error)));
  };
}

