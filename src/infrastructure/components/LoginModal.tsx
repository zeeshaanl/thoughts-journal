import * as React from 'react';
import styled from 'styled-components'
import {Redirect} from "react-router-dom";

interface IProps {
    handleGoogleLogin: any,
    closeModal: any,
    isLoggedIn: boolean,
    location: {
        state: {
            from: {
                pathname: string
            }
        }
    },
    history: {
        replace: any
    }
}

const Login = styled.div`
  padding: 6em;
`;


const LogInButton = styled.div`
  display: block;
  border: 1px solid gray;
  border-radius: 5px;  
  padding: 1.2em;
  width: 300px;
  cursor: pointer;
  text-align: center;
  &:hover {
      background-color: #e4e4e4 ;
    }
`;

class LoginModal extends React.Component<IProps> {
    public static getDerivedStateFromProps(props: any, state: any) {
        const {isLoggedIn, location} = props;
        const {state: locationState} = location;
        if (isLoggedIn) {
            props.history.replace(locationState && locationState.from ? locationState.from.pathname : '/thoughts')
        }
        return state;
    }

    public state = {};


    public render() {
        const {handleGoogleLogin, closeModal, isLoggedIn} = this.props;
        // console.log(this.props, 'props IN RENDER');
        // if (isLoggedIn) {
        //     closeModal(<Redirect to={this.props.location.state.from.pathname} />)
        // }
        return (
            <Login>
                <LogInButton onClick={handleGoogleLogin}>Continue with google</LogInButton>
            </Login>
        );
    }
};

export default LoginModal;
