import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, type UserService } from "../../interfaces";
import { repositoryTokens } from "../../common/tokens/repository.tokens";
import { type User } from "../../domain";
import { type UserRegister } from "../../common/schema/user/user-register.schema";

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(@Inject(repositoryTokens.user) private readonly userRepository: UserRepository) {}

    public async createUser(user: UserRegister): Promise<any> {
        // const user = {};

        return await this.userRepository.create(user);
    }

    public async updateUser(user: User): Promise<User> {
        return await this.userRepository.update(user);
    }

    public async deleteUser(id: string): Promise<User[]> {
        return await this.userRepository.delete(id);
    }
}
