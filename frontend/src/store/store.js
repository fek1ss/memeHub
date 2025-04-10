import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/AuthReducer';
import memeReducer from '../reducers/MemReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  memes: memeReducer,
});

const store = createStore(rootReducer);

export default store;
