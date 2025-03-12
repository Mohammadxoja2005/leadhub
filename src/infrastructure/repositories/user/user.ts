import { User } from "app/domain";
import { UserCreate } from "app/application/api/controllers/auth/types";

export interface UserRepository {
    create: (user: UserCreate) => Promise<void>;

    delete: (id: string) => Promise<void>;

    getAll: () => Promise<User[]>;

    getUserByGoogleId: (id: string) => Promise<User[]>;

    getById: (id: string) => Promise<User>;
}
