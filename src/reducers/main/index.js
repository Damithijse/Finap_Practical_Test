import {combineReducers} from 'redux';
import LoadingReducer from '../MainReducer';

export const reducer = combineReducers({
  loading: LoadingReducer,
});
