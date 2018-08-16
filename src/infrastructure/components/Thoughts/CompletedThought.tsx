import * as React from 'react';
import Time from "./Time";
import styled from "styled-components";
import Button from "@material-ui/core/Button/Button";

const CompletedThoughtDiv = styled.div`
    width: 20em;
    min-height: 4em;
    display: flex;
    white-space: pre-line;
      align-items: center;
`;

interface IProps {
    time: Date,
    message: string
}

class CompletedThought extends React.PureComponent<IProps> {
    public render() {
        const {time, message} = this.props;
        console.log('in render');

        return (
            <React.Fragment>
                <Time dateTime={time} />
                <CompletedThoughtDiv>{message}</CompletedThoughtDiv>
                <Button variant='raised' color='secondary'>Remove Thought</Button>
            </React.Fragment>
        );
    }
}


export default CompletedThought;



