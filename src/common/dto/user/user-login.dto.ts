import { IsString } from "class-validator";

export class UserLoginDto {
    @IsString()
    usernameOrEmail: string;
    @IsString()
    password: string;
}
