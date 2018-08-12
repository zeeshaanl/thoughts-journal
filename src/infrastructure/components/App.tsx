import * as React from 'react';
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
import Thoughts from "./Thoughts";

interface IState {
    user?: User,
    loadingAuth: boolean
}

interface IProps {
    useCaseRegistry: UseCaseRegistry
}

const Header = styled.header`
    text-align: center;
    font-size: 2.5em;
    padding-top: 1em;
`;

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
                <Header>Thoughts Journal</Header>
                <Router>
                    {!loadingAuth && <div>
                        <Route
                            exact={true}
                            path="/"
                            component={IntroPage}
                        />
                        <ModalRoute
                            path='/login'
                            parentPath='/thoughts'
                            closeModal='/'
                            component={LoginModal}
                            props={{handleGoogleLogin: this.handleGoogleLogin, isLoggedIn: !!user}}
                        />
                        <ProtectedRoute path='/thoughts' user={user} component={Thoughts} />
                    </div>
                    }
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
