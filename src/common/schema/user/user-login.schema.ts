import { z } from "zod";

export const UserLoginSchema = z.object({
    template: z
        .object({
            data: z.object({
                usernameOrEmail: z.string(),
                password: z.string(),
            }),
        })
        .required(),
});
