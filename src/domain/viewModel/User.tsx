export default class User {
    constructor(public id: string, public firstName: string, public lastName: string, public email: string, public photoUrl: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.photoUrl = photoUrl;
        Object.freeze(this);
    }
}
