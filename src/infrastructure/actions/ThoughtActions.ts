import Thought from "../../domain/viewModel/Thought";
import User from "../../domain/viewModel/User";

export const ADD_THOUGHT: string = 'ADD_THOUGHT';

export interface IAddThought {
    type: string,
    thought: Thought
}

export const addThought = (thought: Thought): IAddThought => ({
    type: ADD_THOUGHT,
    thought
});
