import { Controller, Get, Req } from "@nestjs/common";
import { UserService } from "../../service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(@Req() request: Request): string {
        return "all good";
    }
}
