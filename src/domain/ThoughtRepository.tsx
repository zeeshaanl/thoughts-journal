import Thought from "./viewModel/Thought";

export default interface IThoughtRepository {
    persistThought: (thought: Thought) => void,
    getThoughtById: (id: string) => Thought
}