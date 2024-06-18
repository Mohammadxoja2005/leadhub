import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, type UserService } from "../../interfaces";
import { repositoryTokens } from "../../common/tokens/repository.tokens";
import { type User } from "../../domain";
import {
    UserRegisterRequest,
    UserRegisterResponse,
} from "../../interfaces/services/user/user-create.interface";

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(@Inject(repositoryTokens.user) private readonly userRepository: UserRepository) {}

    public async createUser(userRegister: UserRegisterRequest): Promise<UserRegisterResponse> {
        const user = userRegister.template.data;
        const createdUser = this.userRepository.create(user as User);

        return await createdUser;
    }

    public async updateUser(user: User): Promise<User> {
        return await this.userRepository.update(user);
    }

    public async deleteUser(id: string): Promise<User[]> {
        return await this.userRepository.delete(id);
    }
}
