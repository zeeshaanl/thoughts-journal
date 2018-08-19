import Thought from "../../domain/viewModel/Thought";
import User from "../../domain/viewModel/User";

export const ADD_THOUGHT: string = 'ADD_THOUGHT';
export const REMOVE_THOUGHT: string = 'REMOVE_THOUGHT';

export interface IAddThought {
    type: string,
    thought: Thought
}


export interface IRemoveThought {
    type: string,
    id: string
}

export const addThought = (thought: Thought): IAddThought => ({
    type: ADD_THOUGHT,
    thought
});

export const removeThought = (id: string): IRemoveThought => ({
    type: REMOVE_THOUGHT,
    id
});
