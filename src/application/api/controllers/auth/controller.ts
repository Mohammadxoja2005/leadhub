import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthenticateUserUseCase } from "app/application/usecases";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        _json: { name?: string; email?: string; email_verified?: boolean };
    };
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

        const result = await this.authenticateUserUseCase.execute({
            name: user._json.name ?? null,
            email: user._json.email ?? null,
            googleId: user.id,
        });

        console.log("result", result);
        res.json();
    }
}
