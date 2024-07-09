import { Body, Controller, HttpStatus, Inject, Post, Res } from "@nestjs/common";
import { UserService } from "../../interfaces";
import { serviceTokens } from "../../common/tokens/service.tokens";
import { Response } from "express";
import { UserLoginDto } from "../../common/dto/user/user-login.dto";
import { UserRegisterDto } from "../../common/dto/user/user-register.dto";

@Controller("user")
export class UserController {
    constructor(
        @Inject(serviceTokens.user)
        private readonly userService: UserService,
    ) {}

    @Post("/register")
    async register(@Body() body: UserRegisterDto, @Res() response: Response): Promise<void> {
        const registeredUser = await this.userService.createUser(body);

        response.status(HttpStatus.CREATED).json(registeredUser);
    }

    @Post("/login")
    async login(@Body() body: UserLoginDto, @Res() response: Response): Promise<void> {
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
