import User from "../../domain/viewModel/User";

export default class UserRepo {

    constructor(private firebase: any) {
        this.firebase = firebase
    }

    public saveUser = async (user: User) => {
        console.log('in here');
    }
}