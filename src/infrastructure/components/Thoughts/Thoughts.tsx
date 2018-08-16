import * as React from 'react';
import styled from "styled-components";
import User from "../../../domain/viewModel/User";
import Moment from "react-moment";
import * as keymaster from 'keymaster';
import ThoughtsHeaderContainer from "./ThoughtsHeaderContainer";
import Time from "./Time";
import Thought from "../../../domain/viewModel/Thought";
import Button from "@material-ui/core/Button/Button";
import CompletedThought from "./CompletedThought";


const ThoughtsBody = styled.div`
  margin-top: 4em;
  padding: 0 20%;
  text-align: center;
`;

const ThoughtInput = styled.textarea`
  //border-radius: 4px;
  width: 20em;
  margin-right: 1em;
`;

const ThoughtRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
`;

interface IThought {
    id: string,
    timestamp: Date,
    message: string
}

interface IProps {
    user: User,
    thoughtsById: {
        [id: string]: Thought
    } | {},
    thoughtIds: string[],
    addThought: any
}

interface IState {
    currentDateTime: Date,
    currentThoughtMessage: string
}

const pressedKeys: any = new Set();


class Thoughts extends React.Component<IProps, IState> {
    public state = {
        currentDateTime: new Date(),
        currentThoughtMessage: '',
        thoughtsById: {},
        thoughtIds: []
    };

    public timeInterval: NodeJS.Timer;

    public componentDidMount() {
        this.timeInterval = setInterval(() => {
            this.setState(() => ({currentDateTime: new Date()}))
        }, 1000)
    }

    public componentWillUnmount() {
        clearInterval(this.timeInterval);
    }

    public render() {
        const {user, thoughtsById, thoughtIds, addThought} = this.props;
        const {currentDateTime, currentThoughtMessage} = this.state;

        return (
            <div>
                <ThoughtsHeaderContainer user={user} currentDateTime={currentDateTime} />
                <ThoughtsBody>
                    {
                        thoughtIds.map((thoughtId: string) =>
                            <ThoughtRow key={thoughtsById[thoughtId].id}>
                                <CompletedThought time={thoughtsById[thoughtId].timestamp} message={thoughtsById[thoughtId].message} />
                            </ThoughtRow>
                        )
                    }
                    <ThoughtRow>
                        <Time dateTime={currentDateTime} />
                        <ThoughtInput
                            value={currentThoughtMessage}
                            onKeyDown={(event) => {
                                pressedKeys.add(event.keyCode);
                                if (pressedKeys.has(13) && pressedKeys.has(16) && currentThoughtMessage.trim()) {
                                    addThought(currentThoughtMessage);
                                    this.currentThoughtHandler('');
                                }
                            }}
                            onKeyUp={(event) => {
                                pressedKeys.delete(event.keyCode)
                            }}
                            onChange={(event) => this.currentThoughtHandler(event.target.value)} />
                        <Button variant='raised' color='primary' onClick={() => addThought(currentThoughtMessage)}>Add Thought</Button>
                    </ThoughtRow>
                </ThoughtsBody>
            </div>
        );
    }

    private currentThoughtHandler = (message: string) => {
        this.setState(() => ({currentThoughtMessage: message}))
    };
}

export default Thoughts;
