import { IsString } from "class-validator";

export class Input {
    @IsString()
    usernameOrEmail: string;
    @IsString()
    password: string;
}
