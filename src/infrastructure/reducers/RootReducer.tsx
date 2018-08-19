import {combineReducers} from "redux";
import UserReducer from "./UserReducer";
import ThoughtReducer, {IThoughtState} from "./ThoughtReducer";
import User from "../../domain/viewModel/User";

export interface IAppState {
    user: User,
    thoughts: IThoughtState
}

const rootReducer = combineReducers({
    user: UserReducer,
    thoughts: ThoughtReducer
});

export default rootReducer;