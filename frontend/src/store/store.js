import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/AuthReducer';
import CommentsReducer from './../reducers/CommentsReducer';
import memesReducer from './../reducers/MemeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  comments: CommentsReducer,
  selectedMeme: memesReducer,
});

const store = createStore(rootReducer);

export default store;
