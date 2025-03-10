import { IsNumber, IsString, IsOptional } from "class-validator";
import { DealStatus } from "app/domain";

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
    @IsNumber()
    public status: DealStatus;
}
