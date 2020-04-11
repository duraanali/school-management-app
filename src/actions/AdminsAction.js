import { axiosWithAuth } from "../utility/axiosWithAuth";

export const FETCH_PARENTS_DATA_START = "FETCH_PARENTS_DATA_START";
export const FETCH_PARENTS_DATA_SUCCESS = "FETCH_PARENTS_DATA_SUCCESS";
export const FETCH_PARENTS_DATA_FAILURE = "FETCH_PARENTS_DATA_FAILURE";
export const DELETE_PARENTS_DATA_SUCCESS = "DELETE_PARENTS_DATA_SUCCESS";

export const fetchParentsBegin = () => ({
  type: FETCH_PARENTS_DATA_START,
});

export const fetchParentsSuccess = (parents) => ({
  type: FETCH_PARENTS_DATA_SUCCESS,
  payload: { parents },
});

export const fetchParentsFailure = (error) => ({
  type: FETCH_PARENTS_DATA_FAILURE,
  payload: { error },
});

export const deleteParentsSuccess = (parents) => ({
  type: DELETE_PARENTS_DATA_SUCCESS,
  payload: { parents },
});


export function fetchParents() {
  return (dispatch) => {
    dispatch(fetchParentsBegin());
    return axiosWithAuth()
      .get(`http://localhost:5000/api/parents/`)
      .then((res) => {
        
        dispatch(fetchParentsSuccess(res.data));
      })
      .catch((error) => dispatch(fetchParentsFailure(error)));
  };
}

export function deleteParent() {
  return (dispatch) => {
    dispatch(deleteParentsSuccess());
    return axiosWithAuth()
      .delete(`https://alifcloud.herokuapp.com/api/parents/${3}`)
      .then((res) => {

        dispatch(deleteParentsSuccess(res.data));
      })
      .catch((error) => dispatch(fetchParentsFailure(error)));
  };
}

