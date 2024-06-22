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

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(
        @Inject(repositoryTokens.user)
        private readonly userRepository: UserRepository,
        @Inject(helperTokens.collectionJsonHelper)
        private readonly collectionJsonHelper: CollectionJsonHelper,
    ) {}

    public async createUser(userRegister: UserRegisterRequest): Promise<UserRegisterResponse> {
        const user = this.collectionJsonHelper.parseRequestJsonCollection(userRegister);
        const createdUser = await this.userRepository.create(user as User);

        return this.collectionJsonHelper.buildResponseJsonCollection<User>(createdUser);
    }

    public async updateUser(user: User): Promise<User> {
        return await this.userRepository.update(user);
    }

    public async deleteUser(id: string): Promise<User[]> {
        return await this.userRepository.delete(id);
    }
}
