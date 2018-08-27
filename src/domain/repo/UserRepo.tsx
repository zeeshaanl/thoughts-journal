import Thought from "../viewModel/Thought";

export default interface IUserRepo {
    saveUser: (userId: string) => void
}