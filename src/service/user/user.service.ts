import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repository";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    createUser() {
        console.log(this.userRepository);
    }
}
