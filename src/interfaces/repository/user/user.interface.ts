import { Repository } from "../index.interface";
import { User } from "../../../domain";

export interface UserRepository extends Repository<User> {
    create(user: User): Promise<User>;

    update(user: User): Promise<User>;

    delete(id: string): Promise<User[]>;
}
