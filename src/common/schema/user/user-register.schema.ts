import { z } from "zod";

export const UserRegisterSchema = z.object({
    template: z
        .object({
            data: z.tuple([
                z.object({
                    name: z.literal("name"),
                    value: z.string(),
                }),
                z.object({
                    name: z.literal("phone"),
                    value: z.number(),
                }),
                z.object({
                    name: z.literal("email"),
                    value: z.string(),
                }),
            ]),
        })
        .required(),
});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
