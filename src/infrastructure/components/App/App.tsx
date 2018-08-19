import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import User from "../../../domain/viewModel/User";
import IntroPage from "../IntroPage";
import UserActionsUseCaseRegistry from "../../../application/useCase/userActions/UserActionsUseCaseRegistry";
import {ModalContainer, ModalRoute} from 'react-router-modal';
import styled from 'styled-components';
import routes from '../../routes';
import {
    BrowserRouter as Router, Redirect,
    Route
} from 'react-router-dom'
import 'react-router-modal/css/react-router-modal.css';
import LoginModal from "../LoginModal";
import ProtectedRoute from "../ProtectedRoute";
import ThoughtsContainer from "../Thoughts/ThoughtsContainer";
import RegisterButtons from "../RegisterButtons";
import {IRemoveUser, ISaveUser} from "../../actions/UserActions";

interface IState {
    loadingAuth: boolean
}

interface IProps {
    useCaseRegistry: UserActionsUseCaseRegistry,
    saveUser: (user: User) => ISaveUser,
    removeUser: () => IRemoveUser,
    user: User
}

class App extends React.Component<IProps, IState> {
    public state: IState = {
        loadingAuth: true
    };

    public componentDidMount() {
        this.getLoggedInUser();
    }

    public render() {
        const {loadingAuth} = this.state;
        const {user} = this.props;
        const isLoggedIn: boolean = !!user && Object.keys(user).length !== 0;
        return (
            <div>
                <CssBaseline />
                <Router>
                    <div>
                        <Route
                            exact={true}
                            path={routes.home}
                            component={IntroPage}
                        />
                        {!loadingAuth && <div>
                            <Route
                                exact={true}
                                path={routes.home}
                                render={(props: any) => <RegisterButtons {...props} isSignedIn={!!user} />}
                            />
                            <ModalRoute
                                path={routes.login}
                                parentPath={routes.thoughts}
                                closeModal={routes.home}
                                component={LoginModal}
                                props={{handleGoogleLogin: this.handleGoogleLogin, isLoggedIn}}
                            />
                            <ProtectedRoute handleLogout={this.handleGoogleLogout} path={routes.thoughts} isLoggedIn={isLoggedIn} user={user} component={ThoughtsContainer} />
                        </div>}
                    </div>
                </Router>
                <ModalContainer />
            </div>
        );
    }

    private handleGoogleLogin = async () => {
        try {
            const user: User = await this.props.useCaseRegistry.createUserUseCase.invoke('google');
            this.props.saveUser(user);
        } catch (error) {
            console.log(error, 'Error in login');
        }
    };

    private handleGoogleLogout = async () => {
        try {
            const result = await this.props.useCaseRegistry.logoutUseCase.invoke();
            this.props.removeUser();
        } catch (error) {
            console.log(error, 'Error in logout');
        }
    };

    private getLoggedInUser = () => {
        // if !this.props.user
        this.props.useCaseRegistry.checkIfUserIsSignedIn.invoke((user: User) => {
            if (user) {
                this.props.saveUser(user);
                this.setState({loadingAuth: false})
            } else {
                this.props.removeUser();
                this.setState({loadingAuth: false})
            }
        });
    }
}

export default styled(App)`
  width: 100vw;
  height: 100vh;
`;
