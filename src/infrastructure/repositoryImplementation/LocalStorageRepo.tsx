import IThoughtRepository from "../../domain/repo/ThoughtRepo";
import Thought from "../../domain/viewModel/Thought";

export default class LocalStorageRepo implements IThoughtRepository {
    public getThoughtById: (id: string) => Thought;
    public persistThought: (thought: Thought) => void;
    // public persistThought = (thought: Thought): any => {
    //     return new Promise((resolve, reject) =>{
    //
    //     })
    // };
}