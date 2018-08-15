export default class User {
    constructor(public uid: string, public firstName: string, public lastName: string, public email: string, public photoUrl: string) {
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.photoUrl = photoUrl;
    }
}
