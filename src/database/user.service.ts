import { ICreateUserDto, User } from "./models/user";

export class UserService {
    model: typeof User;
    constructor(model: typeof User) {
        this.model = model;
    }

    create(options: ICreateUserDto) {
        return this.model.create({ ...options });
    }

    getAll() {
        return this.model.findAll();
    }
}
