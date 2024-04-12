import { User } from "../../../domain";

export interface UserService {
    createUser(user: User): Promise<User>;

    updateUser(user: User): Promise<User>;

    deleteUser(id: string): Promise<User[]>;

    findAllUsers(): Promise<User[]>;

    findOneUser(id: string): Promise<User>;
}
