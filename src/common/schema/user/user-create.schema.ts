import { z } from "zod";

export const UserCreateSchema = z.object({

});

export type UserCreateDto = z.infer<typeof UserCreateSchema>;
