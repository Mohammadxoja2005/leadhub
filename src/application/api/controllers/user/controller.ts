import { Body, Controller, HttpStatus, Inject, Post, Res } from "@nestjs/common";
import { UserService } from "../../../services";
import { Application } from "../../../../common/tokens";
import { Response } from "express";
import { Input as LoginInput } from "./login";
import { Input as RegisterInput } from "./register";

@Controller("user")
export class UserController {
    constructor(
        @Inject(Application.Service.User)
        private readonly userService: UserService,
    ) {}

    @Post("/register")
    async register(@Body() body: RegisterInput, @Res() response: Response): Promise<void> {
        const registeredUser = await this.userService.createUser(body);

        response.status(HttpStatus.CREATED).json(registeredUser);
    }

    @Post("/login")
    async login(@Body() body: LoginInput, @Res() response: Response): Promise<void> {
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
