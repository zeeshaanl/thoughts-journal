import {applyMiddleware, createStore} from "redux";
import rootReducer from '../reducers/RootReducer';
import {addThought} from "../actions/ThoughtActions";
import logger from 'redux-logger'
import {throttle} from 'lodash';

// Persist to localStorage code
// export const saveState = (state: any) => {
//     try {
//         const serialisedState = JSON.stringify(state);
//         localStorage.setItem('state', serialisedState);
//     } catch (err) {
//         console.log(err);
//     }
// };
//
// export const loadState = (): any => {
//     try {
//         const serialisedState = localStorage.getItem('state');
//         if (!serialisedState) {
//             return undefined
//         }
//         return JSON.parse(serialisedState);
//     } catch (err) {
//         console.log(err);
//         return undefined;
//     }
// };
//
// const persistedState = loadState();

const store = createStore(rootReducer, applyMiddleware(logger));

// store.subscribe(throttle(() => {
//     saveState({
//         thoughtIds: store.getState().thoughtIds,
//         thoughtsById: store.getState().thoughtsById
//     })
// }, 1000));

export default store;

