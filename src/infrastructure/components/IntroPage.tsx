import * as React from 'react';
import styled from "styled-components";



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


const Header = styled.header`
    text-align: center;
    font-size: 2.5em;
    padding-top: 1em;
`;


const IntroPage = (props: any) => {
    return (
        <Main>
            <Header>Thoughts Journal</Header>
            <IntroSection>
                Record your thoughts as they come to you, in a simple and clean interface.<br />

                Then, look back and reflect, as the days pass.
            </IntroSection>

        </Main>
    );
};

export default IntroPage;
