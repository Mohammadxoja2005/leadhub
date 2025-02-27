import { IsString } from "class-validator";

export class Input {
    @IsString()
    public name: string;
    @IsString()
    organization: string;
    @IsString()
    email: string;
    @IsString()
    phone: string;
}