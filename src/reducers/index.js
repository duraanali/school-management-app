import { combineReducers } from 'redux'
import StudentsReducer from './StudentsReducer'
import ParentsReducer from './ParentsReducer'

export default combineReducers({
  StudentsReducer,
  ParentsReducer
})