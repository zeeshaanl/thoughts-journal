import IThoughtRepository from "../../../domain/ThoughtRepository";
import Thought from "../../../domain/viewModel/Thought";

export default class PersistThoughtUseCase {
    constructor(private thoughtRepository: IThoughtRepository) {
        this.thoughtRepository = thoughtRepository;
    }

    public invoke = (thought: Thought) => {
        this.thoughtRepository.persistThought(thought)
    }
}