import { User } from "app/domain";

export interface UserService {
    create: (user: User) => Promise<void>;

    delete: (id: string) => Promise<void>;

    getById: (id: string) => Promise<User>;

    authenticate: (user: {
        name: string | null;
        email: string | null;
        googleId: string;
    }) => Promise<{ user: User; token: string }>;
}
