import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, type UserService } from "../../interfaces";
import { repositoryTokens } from "../../common/tokens/repository.tokens";
import { type User } from "../../domain";
import { UserCreateInput } from "../../interfaces/services/user/user-create.interface";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import * as crypto from "node:crypto";

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(
        @Inject(repositoryTokens.user)
        private readonly userRepository: UserRepository,
    ) {}

    public async createUser(userRegister: UserCreateInput): Promise<User> {
        userRegister.project_id = crypto.randomUUID();

        // TODO это _id только на время, после того как подключем настояшию базу, уберем это поле польностью
        userRegister["_id"] = crypto.randomUUID();

        userRegister.password = await bcrypt.hash(userRegister.password, 10);

        return await this.userRepository.create(userRegister as User);
    }

    public async loginUser(
        usernameOrEmail: string,
        password: string,
    ): Promise<{ user: User; token: string } | false> {
        try {
            const user = await this.userRepository.findByUsernameOrEmail(usernameOrEmail);

            const isUserLoginPasswordMatched = await bcrypt.compare(password, user.password);

            const accessToken = sign(
                { username: user.username, user_id: user._id, project_id: user.project_id },
                `${process.env.JWT_SECRET_KEY}`,
            );

            if (isUserLoginPasswordMatched) {
                return { user, token: accessToken };
            }
        } catch (error) {
            console.error(error);
        }

        return false;
    }

    public async updateUser(user: User): Promise<User> {
        return await this.userRepository.update(user);
    }

    public async deleteUser(id: string): Promise<User[]> {
        return await this.userRepository.delete(id);
    }
}
