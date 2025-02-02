import { IsDateString, IsNumber, IsString } from "class-validator";
import { DealStatus } from "../../../../../domain";

export class Input {
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
    @IsNumber()
    value: number;
    @IsString()
    status: DealStatus;
}
