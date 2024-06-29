import { Body, Controller, HttpStatus, Inject, Post, Req, Res, UsePipes } from "@nestjs/common";
import { UserService } from "../../interfaces";
import { serviceTokens } from "../../common/tokens/service.tokens";
import { UserPipes } from "../../common/pipes/user.pipes";
import { UserRegisterSchema } from "../../common/schema/user/user-register.schema";
import { UserLoginSchema } from "../../common/schema/user/user-login.schema";
import { UserRegisterRequest } from "../../interfaces/services/user/user-create.interface";
import { Response } from "express";
import { UserLoginRequest } from "../../interfaces/services/user/user-login.interface";

@Controller("user")
export class UserController {
    constructor(
        @Inject(serviceTokens.user)
        private readonly userService: UserService,
    ) {}

    @Post("/register")
    @UsePipes(new UserPipes(UserRegisterSchema))
    async register(@Body() body: UserRegisterRequest, @Res() response: Response): Promise<void> {
        const registeredUser = await this.userService.createUser(body);

        response.status(HttpStatus.CREATED).json(registeredUser);
    }

    @Post("/login")
    @UsePipes(new UserPipes(UserLoginSchema))
    async login(@Body() body: UserLoginRequest, @Res() response: Response): Promise<void> {
        const loggedUser = await this.userService.loginUser(body);

        if (!loggedUser) {
            response.status(HttpStatus.UNAUTHORIZED).json({
                error: {
                    title: "Unauthorized",
                    code: HttpStatus.UNAUTHORIZED,
                    message: "User is unauthorized",
                },
            });
        }

        response.status(HttpStatus.OK).json(loggedUser);
    }
}
