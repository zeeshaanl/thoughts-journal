export default class Thought {
    constructor(public id: string, public timestamp: Date, public message: string) {
        this.id = id;
        this.timestamp = timestamp;
        this.message = message;
        Object.freeze(this);
    }
}