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
                    value: z.string(),
                }),
                z.object({
                    name: z.literal("email"),
                    value: z.string(),
                }),
                z.object({
                    name: z.literal("role"),
                    value: z.union([z.literal("admin"), z.literal("regular")]),
                }),
            ]),
        })
        .required(),
});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
