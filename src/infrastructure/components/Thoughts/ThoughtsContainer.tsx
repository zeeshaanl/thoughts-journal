import * as React from 'react';
import {connect} from "react-redux";
import {IAppState} from "../../reducers/RootReducer";
import {Dispatch} from "redux";
import {addThought, getThoughts, IAddThought, IRemoveThought, removeThought} from "../../actions/ThoughtActions";
import Thought from "../../../domain/viewModel/Thought";
import Thoughts from "./Thoughts";
import User from "../../../domain/viewModel/User";
import {IThoughtState} from "../../reducers/ThoughtReducer";

interface IThoughtsContainerOwnProps {
    user: User,
    handleLogout: () => void
}

const mapStateToProps = (state: IAppState, ownProps: IThoughtsContainerOwnProps) => {
    const {thoughts}: { thoughts: IThoughtState } = state;
    const {
        thoughtIds,
        thoughtsById
    } = thoughts;
    return {
        thoughtIds,
        thoughtsById,
        ...ownProps
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addThought: (message: string): IAddThought => {
        const thought: Thought = {
            id: new Date().getUTCMilliseconds().toString(),
            message,
            timestamp: new Date(),
        };
        return dispatch(
            addThought(thought)
        )
    },
    getThoughts: (date: Date) => dispatch(getThoughts(date)),
    removeThought: (id: string): IRemoveThought =>
        dispatch(
            removeThought(id)
        )
});

const ThoughtsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Thoughts);

export default ThoughtsContainer;