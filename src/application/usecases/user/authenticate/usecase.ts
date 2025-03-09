import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { UserService } from "app/application/services";

@Injectable()
export class AuthenticateUserUseCase {
    constructor(
        @Inject(Application.Service.User)
        private readonly userService: UserService,
    ) {}

    public async execute(user: {
        name: string | null;
        email: string | null;
        googleId: string;
    }): Promise<void> {
        await this.userService.authenticate(user);
    }
}
