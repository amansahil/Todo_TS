import { combineReducers } from 'redux';
import AuthReducer from './AuthReducers';
import FormReducer from './FormReducers';
import ListReducer from './ListReducers'

export default combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  list: ListReducer
});
