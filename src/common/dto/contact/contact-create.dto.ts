import { IsString } from "class-validator";

export class ContactCreateDto {
    @IsString()
    name: string;
    @IsString()
    organization: string;
    @IsString()
    email: string;
    @IsString()
    phone: string;
}