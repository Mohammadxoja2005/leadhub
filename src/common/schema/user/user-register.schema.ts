import { z } from "zod";

export const UserRegisterSchema = z.object({
    template: z
        .object({
            data: z.object({
                name: z.string(),
                phone: z.string(),
                email: z.string(),
                role: z.union([z.literal("admin"), z.literal("regular")]),
            }),
        })
        .required(),
});
