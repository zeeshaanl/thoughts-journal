import * as React from 'react';
import Time from "./Time";
import styled from "styled-components";
import Button from "../Button";
import {IRemoveThought} from "../../actions/ThoughtActions";

const CompletedThoughtDiv = styled.div`
    width: 20em;
    margin-right: 1em;
    min-height: 4em;
    display: flex;
    white-space: pre-line;
      align-items: center;
`;

interface IProps {
    id: string,
    time: Date,
    message: string,
    removeThought: (id: string) => IRemoveThought,
}

class CompletedThought extends React.PureComponent<IProps> {
    public render() {
        const {id, time, message, removeThought} = this.props;

        return (
            <React.Fragment>
                <Time dateTime={time} />
                <CompletedThoughtDiv>{message}</CompletedThoughtDiv>
                <Button onClick={() => removeThought(id)} color='secondary'>
                    Remove Thought
                </Button>
            </React.Fragment>
        );
    }
}


export default CompletedThought;



