import { combineReducers, Reducer } from 'redux';
import AuthReducer from './AuthReducers';
import FormReducer from './FormReducers';
import ListReducer from './ListReducers'

export default combineReducers({
  auth: AuthReducer as Reducer,
  form: FormReducer as Reducer,
  list: ListReducer as Reducer
});
