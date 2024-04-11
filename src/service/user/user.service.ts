import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repository";
import { User } from "../../domain";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

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
