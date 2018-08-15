import * as React from 'react';
import styled from "styled-components";
import User from "../../../domain/viewModel/User";
import Moment from "react-moment";
import * as keymaster from 'keymaster';
import ThoughtsHeaderContainer from "./ThoughtsHeaderContainer";
import Time from "./Time";


const ThoughtsBody = styled.div`
  margin-top: 4em;
  padding: 0 20%;
  text-align: center;
`;

const CompletedThought = styled.div`
    width: 20em;
    min-height: 4em;
    display: inline-flex;
    text-align: left;
    white-space: pre-line;
      align-items: center;    
`;

const ThoughtInput = styled.textarea`
  //border-radius: 4px;
  width: 20em;
`;

const ThoughtRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IThought {
    id: string,
    timestamp: Date,
    message: string
}

interface IProps {
    user: User
}

interface IState {
    currentDateTime: Date,
    currentThoughtMessage: string,
    thoughts: IThought[]
}

const pressedKeys: any = new Set();


class Thoughts extends React.Component<IProps, IState> {
    public state = {
        currentDateTime: new Date(),
        currentThoughtMessage: '',
        thoughts: []
    };

    public timeInterval: NodeJS.Timer;

    public componentDidMount() {
        this.timeInterval = setInterval(() => {
            console.log('in interval');
            this.setState(() => ({currentDateTime: new Date()}))
        }, 1000)
    }

    public componentWillUnmount() {
        clearInterval(this.timeInterval);
    }

    public render() {
        const {user} = this.props;
        const {currentDateTime, currentThoughtMessage, thoughts} = this.state;

        return (
            <div>
                <ThoughtsHeaderContainer user={user} currentDateTime={currentDateTime} />
                <ThoughtsBody>
                    {
                        thoughts.map((thought: IThought) =>
                            <ThoughtRow key={thought.id}>
                                <Time dateTime={thought.timestamp} />
                                <CompletedThought>{thought.message}</CompletedThought>
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
                                    console.log('key press recorded');
                                    this.addThought(currentThoughtMessage)
                                }
                            }}
                            onKeyUp={(event) => {
                                pressedKeys.delete(event.keyCode)
                            }}
                            onChange={(event) => this.currentThoughtHandler(event.target.value)} />
                    </ThoughtRow>
                </ThoughtsBody>
            </div>
        );
    }

    private currentThoughtHandler = (message: string) => {
        this.setState(() => ({currentThoughtMessage: message}))
    };

    private addThought = (message: string) => {
        const thought: IThought = {
            id: new Date().getUTCMilliseconds().toString(),
            message,
            timestamp: new Date(),
        };
        this.setState(() => ({
            ...this.state,
            currentThoughtMessage: '',
            thoughts: [...this.state.thoughts, thought]
        }))
    }
}

export default Thoughts;
