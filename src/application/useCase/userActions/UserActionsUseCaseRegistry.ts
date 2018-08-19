import {IAuthentication} from "../../service/Authentication";
import CreateUserUseCase from "./CreateUserUseCase";
import LogoutUseCase from "./LogoutUseCase";
import SignInUseCase from "./SignInUseCase";
import CheckIfUserIsSignedInUseCase from "./CheckIfUserIsSignedInUseCase";
import IThoughtRepository from "../../../domain/ThoughtRepository";

export default class UserActionsUseCaseRegistry {
    public createUserUseCase: CreateUserUseCase;
    public signInUseCase: SignInUseCase;
    public logoutUseCase: LogoutUseCase;
    public checkIfUserIsSignedIn: CheckIfUserIsSignedInUseCase;

    constructor(authenticationService: IAuthentication) {
        this.createUserUseCase = new CreateUserUseCase(authenticationService);
        this.signInUseCase = new SignInUseCase(authenticationService);
        this.logoutUseCase = new LogoutUseCase(authenticationService);
        this.checkIfUserIsSignedIn = new CheckIfUserIsSignedInUseCase(authenticationService);
    }
}