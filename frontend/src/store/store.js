import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/AuthReducer';
import CommentsReducer from './../reducers/CommentsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  comments: CommentsReducer,
});

const store = createStore(rootReducer);

export default store;
