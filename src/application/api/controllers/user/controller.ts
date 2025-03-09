import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { Input as LoginInput } from "./login";
import { Input as RegisterInput } from "./register";
import { LoginUserUseCase, RegisterUserUseCase } from "app/application/usecases";

@Controller("user")
export class UserController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
    ) {}

    @Post("/register")
    async register(@Body() body: RegisterInput, @Res() response: Response): Promise<void> {
        try {
            await this.registerUserUseCase.execute(body);

            response.status(HttpStatus.CREATED);
        } catch (error) {
            console.error("Error RegisterUserUseCase", error);

            throw error;
        }
    }

    @Post("/login")
    async login(@Body() body: LoginInput, @Res() response: Response): Promise<void> {
        try {
            const { usernameOrEmail, password } = body;

            const loggedUser = await this.loginUserUseCase.execute(usernameOrEmail, password);

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
        } catch (error) {
            console.error("Error LoginUserUseCase", error);

            throw error;
        }
    }
}
