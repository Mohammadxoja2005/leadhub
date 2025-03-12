import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "app/infrastructure/repositories";
import { UserService } from "./user";
import { Infrastructure } from "app/common";
import { User } from "app/domain";
import { sign } from "jsonwebtoken";

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(
        @Inject(Infrastructure.Repository.User)
        private readonly userRepository: UserRepository,
    ) {}

    public async getById(id: string): Promise<User> {
        return this.userRepository.getById(id);
    }

    public async authenticate(user: {
        name: string | null;
        email: string | null;
        googleId: string;
    }): Promise<{ user: User; token: string }> {
        await this.userRepository.create({
            username: null,
            password: null,
            name: user.name,
            email: user.email,
            isActive: true,
            role: "admin",
            projectId: crypto.randomUUID(),
            oAuth: {
                googleId: user.googleId,
            },
        });

        const foundUser = await this.userRepository.getUserByGoogleId(user.googleId);

        const accessToken = sign(
            { userId: foundUser[0].id, projectId: foundUser[0].projectId },
            `${process.env.JWT_SECRET_KEY}`,
        );

        return { user: foundUser[0], token: accessToken };
    }

    public async create(user: User): Promise<void> {
        await this.userRepository.create(user);
    }

    public async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
