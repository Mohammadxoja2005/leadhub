import { PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class UserPipes implements PipeTransform {
    constructor(private readonly schema: ZodSchema) {}

    public transform(): any {}
}
