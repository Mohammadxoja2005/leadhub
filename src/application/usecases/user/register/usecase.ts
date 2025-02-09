import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { UserService } from "app/application/services";
import { User } from "app/domain";

@Injectable()
export class RegisterUserUseCase {
    constructor(
        @Inject(Application.Service.User)
        private readonly userService: UserService,
    ) {}

    public async execute(user: Omit<User, "_id" | "projectId" | "user_id">): Promise<void> {
        await this.userService.createUser(user);
    }
}
