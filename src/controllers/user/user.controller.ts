import { Controller, HttpStatus, Inject, Post, Req, Res, UsePipes } from "@nestjs/common";
import { UserService } from "../../interfaces";
import { serviceTokens } from "../../common/tokens/service.tokens";
import { UserPipes } from "../../common/pipes/user.pipes";
import { UserCreateSchema } from "../../common/schema/user/user-create.schema";

@Controller("user")
export class UserController {
    constructor(@Inject(serviceTokens.user) private readonly userService: UserService) {}

    @Post("/register")
    @UsePipes(new UserPipes(UserCreateSchema))
    async register(@Req() request: Request, @Res() response: Response): Promise<string> {
        const result = await this.userService.createUser();

        response.status(HttpStatus.CREATED).location({}).json();

        return "user registered";
    }

    @Post("/login")
    async login(@Req() request: Request, @Res() response: Response): Promise<string> {
        return "user login";
    }
}
