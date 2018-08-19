import * as React from 'react';
import {
    Link
} from 'react-router-dom'
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";
import routes from '../routes';

const buttonStyle = {
    fontSize: '0.9em',
    margin: '0 2em'
};

interface IProps {
    isSignedIn: boolean
}

const RegisterContainer = styled.div`
  text-align: center;
`;

const RegisterButtons = ({isSignedIn = false}: IProps) => {
    return (
        <RegisterContainer>
            {isSignedIn ?
                <Link to={routes.thoughts}>
                    <Button style={buttonStyle} size='large' color='primary' variant='raised'>
                        Go to my thoughts
                    </Button>
                </Link> :
                <Link to={routes.login}>
                    <Button style={buttonStyle} size='large' color='primary' variant='raised'>
                        Sign up
                    </Button>
                    <Button style={buttonStyle} size='large' color='secondary' variant='raised'>
                        Log in
                    </Button>
                </Link>
            }
        </RegisterContainer>
    );
};

export default RegisterButtons;

