import * as React from 'react';
import {connect} from "react-redux";
import {IApplicationState} from "../../../reducers/ThoughtReducer";
import {Dispatch} from "redux";
import {addThought, IAddThought} from "../../../actions/ThoughtActions";
import Thought from "../../../../domain/viewModel/Thought";
import Thoughts from "../Thoughts";
import User from "../../../../domain/viewModel/User";

interface IOwnProps {
    user: User
}

const mapStateToProps = (state: IApplicationState, ownProps: IOwnProps) => {
    const {
        thoughtIds,
        thoughtsById
    } = state;
    return {
        thoughtIds,
        thoughtsById,
        user: ownProps.user
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
    }
});

const ThoughtsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Thoughts);

export default ThoughtsContainer;