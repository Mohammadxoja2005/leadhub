import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthenticateUserUseCase } from "app/application/usecases";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
    user?: never;
}

@Controller("auth")
export class AuthController {
    constructor(private readonly authenticateUserUseCase: AuthenticateUserUseCase) {}

    @Get("google")
    @UseGuards(AuthGuard("google"))
    async googleAuth() {}

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    async googleAuthCallback(@Req() req: AuthenticatedRequest, @Res() res: Response) {
        const user = req.user;

        // Store user in session or database (handled in service)
        console.log("Authenticated User:", user);

        res.json();
    }
}
