import { IsNumber, IsOptional, IsString } from "class-validator";
import { DealStatus } from "app/domain";

export class Input {
    @IsString()
    public id: string;
    @IsString()
    @IsOptional()
    public title: string;
    @IsNumber()
    @IsOptional()
    public value: number | null;
    @IsString()
    @IsOptional()
    public closeDate: string | null;
    @IsNumber()
    @IsOptional()
    public status: DealStatus;
}
