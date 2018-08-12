import * as React from 'react';
import styled from "styled-components";
import Button from "@material-ui/core/Button/Button";
import UseCaseRegistry from "../../application/useCase/UseCaseRegistry";
import {
    Link
} from 'react-router-dom'

const Main = styled.section`
  text-align: center;
`;

const IntroSection = styled.div`
   font-size: 1.2em;
  display: inline-block;
  padding: 5em;
  line-height: 2;
  //text-align: left;
`;


const buttonStyle = {
    fontSize: '0.9em',
    margin: '0 2em'
};


const IntroPage = (props: any) => {
    console.log(props);
    return (
        <Main>
            <IntroSection>
                Record your thoughts as they come to you, in a simple and clean interface.<br />

                Then, look back and reflect, as the days pass.
            </IntroSection>
            <div>
                <Link to='/login'>
                    <Button style={buttonStyle} size='large' color='primary' variant='raised'>
                        Sign up
                    </Button>
                    <Button style={buttonStyle} size='large' color='secondary' variant='raised'>
                        Log in
                    </Button>
                </Link>
                {/*<LogInButton onClick={handleGoogleLogin}>Log in with google</LogInButton>*/}
            </div>
        </Main>
    );
};

export default IntroPage;
