import { Inject, Injectable } from "@nestjs/common";
import { UserRepository, type UserService } from "../../interfaces";
import { repositoryTokens } from "../../common/tokens/repository.tokens";
import { helperTokens } from "../../common/tokens/helper.tokens";
import { type User } from "../../domain";
import {
    UserRegisterRequest,
    UserRegisterResponse,
} from "../../interfaces/services/user/user-create.interface";
import { CollectionJsonHelper } from "../../helpers/collection-json-helper";
import * as bcrypt from "bcrypt";
import {
    UserLoginRequest,
    UserLoginResponse,
} from "../../interfaces/services/user/user-login.interface";
import { sign } from "jsonwebtoken";

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(
        @Inject(repositoryTokens.user)
        private readonly userRepository: UserRepository,
        @Inject(helperTokens.collectionJsonHelper)
        private readonly collectionJsonHelper: CollectionJsonHelper,
    ) {}

    public async createUser(userRegister: UserRegisterRequest): Promise<UserRegisterResponse> {
        const parsedUserRegisterRequest =
            this.collectionJsonHelper.parseRequestJsonCollection(userRegister);

        parsedUserRegisterRequest.password = await bcrypt.hash(
            parsedUserRegisterRequest.password,
            10,
        );

        const createdUser = await this.userRepository.create(parsedUserRegisterRequest as User);

        return this.collectionJsonHelper.buildResponseJsonCollection<User>(createdUser);
    }

    public async loginUser(
        userLogin: UserLoginRequest,
    ): Promise<{ userLoginResponse: UserLoginResponse; token: string } | false> {
        const parsedUserLoginRequest =
            this.collectionJsonHelper.parseRequestJsonCollection(userLogin);

        try {
            const user = await this.userRepository.findByUsernameOrEmail(
                parsedUserLoginRequest.usernameOrEmail,
            );

            const isUserLoginPasswordMatched = await bcrypt.compare(
                parsedUserLoginRequest.password,
                user.password,
            );

            const accessToken = sign(
                { username: user.username, id: user._id },
                "4e0e52bf313baf4977f3dc976d67bce8",
            );

            const userLoginResponse = this.collectionJsonHelper.buildResponseJsonCollection(user);

            if (isUserLoginPasswordMatched) {
                return { userLoginResponse, token: accessToken };
            }
        } catch (error) {
            console.log(error);
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
