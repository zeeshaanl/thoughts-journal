import IThoughtRepository from "../../../domain/ThoughtRepository";
import PersistThoughtUseCase from "./PersistThoughtUseCase";

export default class ThoughtActionsUseCaseRegistry {
    public persistThoughtUseCase: PersistThoughtUseCase;

    constructor(thoughtRepository: IThoughtRepository) {
        this.persistThoughtUseCase = new PersistThoughtUseCase(thoughtRepository);
    }
}