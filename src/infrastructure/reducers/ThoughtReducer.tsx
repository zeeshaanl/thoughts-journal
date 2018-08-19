import {ADD_THOUGHT, IAddThought, IRemoveThought, REMOVE_THOUGHT} from '../actions/ThoughtActions';
import Thought from "../../domain/viewModel/Thought"
import * as deepFreeze from 'deep-freeze'

export interface IThoughtState {
    readonly thoughtsById: {
        [id: string]: Thought
    } | {},
    readonly thoughtIds: string[]
}

const initialState: IThoughtState = {
    thoughtsById: {},
    thoughtIds: []
};

const ThoughtReducer = (state: IThoughtState = initialState, action: any) => {
    switch (action.type) {
        case ADD_THOUGHT: {
            const {thought}: { thought: Thought } = action;
            return {
                ...state,
                thoughtIds: [...state.thoughtIds, thought.id],
                thoughtsById: {...state.thoughtsById, [thought.id]: thought}
            }
        }
        case REMOVE_THOUGHT: {
            const {id}: { id: string } = action;
            const indexToRemove = state.thoughtIds.indexOf(id);
            const newThoughtIds = [...state.thoughtIds];
            newThoughtIds.splice(indexToRemove, 1);

            const newThoughtsById = {...state.thoughtsById};
            delete newThoughtsById[id];
            return {
                ...state,
                thoughtIds: newThoughtIds,
                thoughtsById: newThoughtsById
            }
        }

        default: {
            return state
        }
    }
};

export default ThoughtReducer;