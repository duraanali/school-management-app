import { combineReducers } from 'redux'
import StudentsReducer from './StudentsReducer'
import ParentsReducer from './ParentsReducer'
import TeachersReducer from './TeachersReducer'
import ClassesReducer from './ClassesReducer'
import SettingsReducer from './SettingsReducer'

export default combineReducers({
  StudentsReducer,
  ParentsReducer,
  TeachersReducer,
  ClassesReducer,
  SettingsReducer
})