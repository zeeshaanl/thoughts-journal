import * as React from 'react';
import {IAppState} from "../../reducers/RootReducer";
import User from "../../../domain/viewModel/User";
import {Dispatch} from "redux";
import {ISaveUser, removeUser, saveUser} from "../../actions/UserActions";
import {connect} from "react-redux";
import App from "./App";
import UserActionsUseCaseRegistry from "../../../application/useCase/userActions/UserActionsUseCaseRegistry";

interface IAppContainerOwnProps {
    useCaseRegistry: UserActionsUseCaseRegistry
}

const mapStateToProps = (state: IAppState, ownProps: IAppContainerOwnProps) => {
    const {user}: { user: User } = state;
    return {
        user,
        ...ownProps
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    saveUser: (user: User): ISaveUser => {
        return dispatch(saveUser(user))
    },
    removeUser: () => dispatch(removeUser())
});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer