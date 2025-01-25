import { User } from "../../../domain";

export interface UserService {
    createUser: (user: any) => Promise<User>;

    deleteUser: (id: string) => Promise<any[]>;

    loginUser: (
        usernameOrEmail: string,
        password: string,
    ) => Promise<{ user: User; token: string } | false>;

    updateUser: (user: any) => Promise<any>;
}
