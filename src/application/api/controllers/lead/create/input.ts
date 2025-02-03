import { IsString, IsNumber, IsOptional } from "class-validator";
import { Lead } from "../../../../../domain";

export class Input implements Lead {
    @IsString()
    public title: string;
    @IsNumber()
    @IsOptional()
    public value: number | null;
    @IsNumber()
    @IsOptional()
    public closeDate: number | null;
    @IsNumber()
    @IsOptional()
    public createdDate: number | null;
    @IsString()
    public contactId: string;
    @IsString()
    public projectId: string;
    @IsString()
    public userId: string;
}
