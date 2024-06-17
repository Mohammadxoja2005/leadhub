import { Body, Controller, HttpStatus, Inject, Post, Req, Res, UsePipes } from "@nestjs/common";
import { UserService } from "../../interfaces";
import { serviceTokens } from "../../common/tokens/service.tokens";
import { UserPipes } from "../../common/pipes/user.pipes";
import { UserRegisterSchema, UserRegister } from "../../common/schema/user/user-register.schema";

@Controller("user")
export class UserController {
    constructor(
        @Inject(serviceTokens.user)
        private readonly userService: UserService,
    ) {}

    @Post("/register")
    @UsePipes(new UserPipes(UserRegisterSchema))
    async register(@Body() body: UserRegister, @Res() response: Response): Promise<void> {
        const result = await this.userService.createUser(body);

        console.log(body);
        // response.status(HttpStatus.CREATED).location({}).json();
    }

    @Post("/login")
    async login(@Req() request: Request, @Res() response: Response): Promise<string> {
        return "user login";
    }
}
