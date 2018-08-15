import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import User from "../../domain/viewModel/User";
import IntroPage from "./IntroPage";
import UseCaseRegistry from "../../application/useCase/UseCaseRegistry";
import {ModalContainer, ModalRoute} from 'react-router-modal';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
import 'react-router-modal/css/react-router-modal.css';
import LoginModal from "./LoginModal";
import ProtectedRoute from "./ProtectedRoute";
import Thoughts from "./Thoughts/Thoughts";
import RegisterButtons from "./RegisterButtons";

interface IState {
    user?: User,
    loadingAuth: boolean
}

interface IProps {
    useCaseRegistry: UseCaseRegistry
}


const YOUR_FIREBASE_API_KEY = 'AIzaSyAjtxmQD29dAeMruRmTjq7ZkHuCDjwm-as';
console.log(localStorage.getItem(`firebase:authUser:${YOUR_FIREBASE_API_KEY}:[DEFAULT]`), 'localstorage');

class App extends React.Component<IProps, IState> {
    public state: IState = {
        loadingAuth: true,
        user: undefined
    };

    public componentDidMount() {
        this.getLoggedInUser();
    }

    public render() {
        const {user, loadingAuth} = this.state;
        return (
            <div>
                <CssBaseline />
                <Router>
                    <div>
                        <Route
                            exact={true}
                            path="/"
                            component={IntroPage}
                        />
                        {!loadingAuth && <div>
                            <Route
                                exact={true}
                                path="/"
                                render={(props: any) => <RegisterButtons {...props} isSignedIn={!!user} />}
                            />
                            <ModalRoute
                                path='/login'
                                parentPath='/thoughts'
                                closeModal='/'
                                component={LoginModal}
                                props={{handleGoogleLogin: this.handleGoogleLogin, isLoggedIn: !!user}}
                            />
                            <ProtectedRoute path='/thoughts' user={user} component={Thoughts} />
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
            this.setState({user});
        } catch (error) {
            console.log(error, 'Error in login');
        }
    };

    private handleGoogleLogout = async () => {
        try {
            const result = await this.props.useCaseRegistry.logoutUseCase.invoke();
            console.log(result, 'logout result');
        } catch (error) {
            console.log(error, 'Error in logout');
        }
    };

    private getLoggedInUser = () => {
        // if !this.props.user
        this.props.useCaseRegistry.checkIfUserIsSignedIn.invoke((user: User) => {
            this.setState({user, loadingAuth: false})
        });
    }
}

export default styled(App)`
  width: 100vw;
  height: 100vh;
`;
