import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { UserService } from "app/application/services";
import { User } from "app/domain";

@Injectable()
export class LoginUserUseCase {
    constructor(
        @Inject(Application.Service.User)
        private readonly userService: UserService,
    ) {}

    public async execute(
        usernameOrEmail: string,
        password: string,
    ): Promise<{ user: User; token: string } | false> {
        return this.userService.loginUser(usernameOrEmail, password);
    }
}
