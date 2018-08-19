import User from "../../domain/viewModel/User";
import {ActionTypes} from "../actions/UserActions";

export interface IUserState {
    readonly user?: User | {}
}

const initialState = {}
;

const UserReducer = (state: IUserState = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SAVE_USER: {
            const {user} = action;
            return {
                ...state,
                ...user
            }
        }
        case ActionTypes.REMOVE_USER: {
            // const newState = {...state};
            // delete newState.user;

            return {}
        }
        default: {
            return state
        }
    }
};

export default UserReducer;