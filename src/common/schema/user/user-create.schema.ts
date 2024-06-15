import { z } from "zod";

export const UserCreateSchema = z.object({
    template: z.object({
        data: z.array(
            z.object({
                name: z.string(),
                value: z.string(),
            }),
        ),
    }),
});

export type UserCreateDto = z.infer<typeof UserCreateSchema>;
