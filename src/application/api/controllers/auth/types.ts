import { User } from "app/domain";

export type UserCreate = Omit<User, "createdAt" | "updatedAt" | "id">;
