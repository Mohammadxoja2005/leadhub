import { Controller, Get, Req } from "@nestjs/common";

@Controller("user")
export class UserController {
    constructor() {}

    @Get()
    findAll(@Req() request: Request): string {
        return "all good";
    }
}
