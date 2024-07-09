import { User } from "../../../domain";

export type UserCreateInput = Omit<User, "_id" | "project_id">;

export interface UserCreate {
    createUser: (user: UserCreateInput) => Promise<User>;
}
