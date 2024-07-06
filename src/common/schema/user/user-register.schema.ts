import { z } from "zod";

export const UserRegisterSchema = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    role: z.union([z.literal("admin"), z.literal("regular")]),
});
