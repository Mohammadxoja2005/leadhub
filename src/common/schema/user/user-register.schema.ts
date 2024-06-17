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
                    name: z.literal("age"),
                    value: z.number(),
                }),
            ]),
        })
        .required(),
});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
