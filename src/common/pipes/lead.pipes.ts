import { type ArgumentMetadata, BadRequestException, type PipeTransform } from "@nestjs/common";
import { type ZodSchema } from "zod";

export class LeadPipes implements PipeTransform {
    constructor(private readonly schema: ZodSchema) {}

    public async transform(value: unknown, metadata: ArgumentMetadata): Promise<void> {
        try {
            return this.schema.parse(value);
        } catch (error) {
            throw new BadRequestException("Validation failed");
        }
    }
}
