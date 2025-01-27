import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { UserService } from "../../../services";
import { User } from "../../../../domain";

@Injectable()
export class RegisterUserUseCase {
    constructor(
        @Inject(Application.Service.User)
        private readonly userService: UserService,
    ) {}

    public async execute(user: Omit<User, "_id" | "project_id" | "user_id">): Promise<void> {
        await this.userService.createUser(user);
    }
}
