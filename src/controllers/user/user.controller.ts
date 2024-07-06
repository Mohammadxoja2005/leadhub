import { Body, Controller, HttpStatus, Inject, Post, Res, UsePipes } from "@nestjs/common";
import { UserService } from "../../interfaces";
import { serviceTokens } from "../../common/tokens/service.tokens";
import { UserPipes } from "../../common/pipes/user.pipes";
import { UserRegisterSchema } from "../../common/schema/user/user-register.schema";
import { UserLoginSchema } from "../../common/schema/user/user-login.schema";
import { Response } from "express";
import { User } from "../../domain";

@Controller("user")
export class UserController {
    constructor(
        @Inject(serviceTokens.user)
        private readonly userService: UserService,
    ) {}

    @Post("/register")
    @UsePipes(new UserPipes(UserRegisterSchema))
    async register(@Body() body: User, @Res() response: Response): Promise<void> {
        const registeredUser = await this.userService.createUser(body);

        response.status(HttpStatus.CREATED).json(registeredUser);
    }

    @Post("/login")
    @UsePipes(new UserPipes(UserLoginSchema))
    async login(
        @Body() body: { usernameOrEmail: string; password: string },
        @Res() response: Response,
    ): Promise<void> {
        const { usernameOrEmail, password } = body;

        const loggedUser = await this.userService.loginUser(usernameOrEmail, password);

        if (!loggedUser) {
            response.status(HttpStatus.UNAUTHORIZED).json({
                error: {
                    title: "Unauthorized",
                    code: HttpStatus.UNAUTHORIZED,
                    message: "User is unauthorized",
                },
            });

            return;
        }

        response.status(HttpStatus.OK).json(loggedUser);
    }
}
