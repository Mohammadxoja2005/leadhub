import { z } from "zod";

export const UserLoginSchema = z.object({
    usernameOrEmail: z.string(),
    password: z.string(),
});
