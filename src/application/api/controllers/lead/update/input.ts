import { LeadUpdate } from "app/application/api/controllers/lead/types";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class Input implements LeadUpdate {
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
}
