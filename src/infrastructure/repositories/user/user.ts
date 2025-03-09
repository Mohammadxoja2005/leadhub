import { User } from "app/domain";

export interface UserRepository {
    create: (user: User) => Promise<void>;

    delete: (id: string) => Promise<void>;

    getAll: () => Promise<User[]>;

    getById: (id: string) => Promise<User>;
}
