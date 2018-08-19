import User from '../../domain/viewModel/User';
import Thought from "../../domain/viewModel/Thought";

export const ActionTypes = {
    SAVE_USER: 'SAVE_USER',
    REMOVE_USER: 'REMOVE_USER',
};

export interface ISaveUser {
    type: string,
    user: User
}


export interface IRemoveUser {
    type: string
}

export const saveUser = (user: User): ISaveUser => ({
    type: ActionTypes.SAVE_USER,
    user
});

export const removeUser = (): IRemoveUser => ({
    type: ActionTypes.REMOVE_USER
});
