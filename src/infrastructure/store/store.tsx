import {applyMiddleware, createStore} from "redux";
import ThoughtReducer from '../reducers/ThoughtReducer';
import {addThought} from "../actions/ThoughtActions";
import logger from 'redux-logger'

const store = createStore(ThoughtReducer, applyMiddleware(logger));

export default store;

