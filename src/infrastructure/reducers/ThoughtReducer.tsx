import {ADD_THOUGHT, IAddThought} from '../actions/ThoughtActions';
import Thought from "../../domain/viewModel/Thought";

export interface IApplicationState {
    readonly thoughtsById: {
        [id: string]: Thought
    } | {},
    readonly thoughtIds: string[]
}

const initialState: IApplicationState = {
    thoughtsById: {},
    thoughtIds: []
};

const ThoughtReducer = (state: IApplicationState = initialState, action: IAddThought) => {
    switch (action.type) {
        case ADD_THOUGHT: {
            const {thought}: { thought: Thought } = action;
            return {
                ...state,
                thoughtIds: [...state.thoughtIds, thought.id],
                thoughtsById: {...state.thoughtsById, [thought.id]: thought}
            }
        }
        default: {
            return state
        }
    }
};

export default ThoughtReducer;