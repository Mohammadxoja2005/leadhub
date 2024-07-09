import { IsString, IsDateString } from "class-validator";

export class LeadCreateDto {
    @IsString()
    name: string;
    @IsString()
    company: string;
    @IsString()
    title: string;
    @IsString()
    phone: string;
    @IsString()
    email: string;
    @IsDateString()
    date: Date;
}
