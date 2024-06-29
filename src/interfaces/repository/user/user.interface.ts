import { type User } from "../../../domain";

export interface UserRepository {
    create: (user: User) => Promise<User>;

    update: (user: User) => Promise<User>;

    delete: (id: string) => Promise<User[]>;

    findAll: () => Promise<User[]>;

    findById: (id: string) => Promise<User>;

    findByUsernameOrEmail: (usernameOrEmail: string) => Promise<User>;
}
