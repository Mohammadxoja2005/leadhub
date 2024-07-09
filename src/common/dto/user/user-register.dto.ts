import { IsString, IsIn } from "class-validator";

export class UserRegisterDto {
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsString()
    name: string;
    @IsString()
    phone: string;
    @IsString()
    email: string;
    @IsIn(["admin", "regular"])
    role: "admin" | "regular";
}
