import { User } from "../../../domain";

export type UserCreateInput = Omit<User, "_id">;

export interface UserCreate {
    createUser: (user: UserCreateInput) => Promise<User>;
}
