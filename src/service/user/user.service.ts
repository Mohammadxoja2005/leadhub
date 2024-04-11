import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../../interfaces";
import { User } from "../../domain";
import { repositoryTokens } from "../../common/tokens/repository.tokens";

@Injectable()
export class UserServiceImpl {
    constructor(@Inject(repositoryTokens.user) private readonly userRepository: UserRepository) {}

    public async createUser(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }

    public async findAllUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    public async findOneUser(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    public async updateUser(user: User): Promise<User> {
        return await this.userRepository.update(user);
    }

    public async deleteUser(id: string): Promise<User[]> {
        return await this.userRepository.delete(id);
    }
}
