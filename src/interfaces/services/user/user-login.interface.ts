import { User } from "../../../domain";

export interface UserLogin {
    loginUser: (
        usernameOrEmail: string,
        password: string,
    ) => Promise<{ user: User; token: string } | false>;
}
