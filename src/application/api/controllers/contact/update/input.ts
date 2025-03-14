import { IsOptional, IsString } from "class-validator";

export class Input {
    @IsOptional()
    @IsString()
    public name: string;
    @IsOptional()
    @IsString()
    organization: string;
    @IsOptional()
    @IsString()
    email: string;
    @IsOptional()
    @IsString()
    phone: string;
}
