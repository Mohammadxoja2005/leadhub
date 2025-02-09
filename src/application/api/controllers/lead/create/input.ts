import { IsString, IsNumber, IsOptional } from "class-validator";

export class Input {
    @IsString()
    public title: string;
    @IsNumber()
    @IsOptional()
    public value: number | null;
    @IsString()
    @IsOptional()
    public closeDate: string | null;
    @IsString()
    public contactId: string;
}
