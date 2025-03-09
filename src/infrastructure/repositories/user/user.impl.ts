import { User } from "app/domain";
import { Injectable, NotFoundException } from "@nestjs/common";
import { type UserRepository } from "./user";
import { InjectModel } from "@nestjs/mongoose";
import { Collections } from "app/infrastructure/schema";
import { Model, Types } from "mongoose";
import {
    UserCreateDocument,
    UserDocument,
    UserHydratedDocument,
} from "app/infrastructure/repositories/user/document";
import * as dayjs from "dayjs";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(
        @InjectModel(Collections.User)
        private readonly model: Model<UserHydratedDocument>,
    ) {}

    public async getAll(): Promise<User[]> {
        const documents = await this.model.find();

        return documents.map((document) => this.documentToEntity(document));
    }

    public async getById(id: string): Promise<User[]> {
        const documents = await this.model.find<UserDocument>({ _id: new Types.ObjectId(id) });

        if (!documents) {
            throw new NotFoundException("User not found");
        }

        return documents.map((document) => this.documentToEntity(document));
    }

    public async create(user: User): Promise<void> {
        await this.model.create<UserCreateDocument>({
            username: user.username,
            password: user.password,
            name: user.name,
            email: user.email,
            is_active: user.isActive,
            role: user.role,
            o_auth: {
                google_id: user.oAuth.googleId,
            },
            project_id: new Types.ObjectId(user.projectId),
            updated_at: new Date(),
            created_at: new Date(),
        });
    }

    public async delete(id: string): Promise<void> {
        await this.model.deleteOne({ _id: new Types.ObjectId(id) });
    }

    private documentToEntity(document: UserDocument): User {
        return {
            id: document._id.toHexString(),
            username: document.username,
            password: document.password,
            name: document.name,
            email: document.email,
            isActive: document.is_active,
            role: document.role,
            oAuth: {
                googleId: document.o_auth.google_id,
            },
            projectId: document.project_id.toHexString(),
            updatedAt: dayjs(document.updated_at).format("MMM D, YYYY"),
            createdAt: dayjs(document.created_at).format("MMM D, YYYY"),
        };
    }
}
