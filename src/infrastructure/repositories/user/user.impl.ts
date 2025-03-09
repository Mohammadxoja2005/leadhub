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
import { UserCreate } from "app/application/api/controllers/auth/types";

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

    public async getUserByGoogleId(id: string): Promise<User> {
        const document = await this.model.findOne<UserDocument>({ "o_auth.google_id": id });

        if (!document) {
            throw new NotFoundException("User not found");
        }

        return this.documentToEntity(document);
    }

    public async getById(id: string): Promise<User> {
        const document = await this.model.findOne<UserDocument>({ _id: new Types.ObjectId(id) });

        if (!document) {
            throw new NotFoundException("User not found");
        }

        return this.documentToEntity(document);
    }

    public async create(user: UserCreate): Promise<void> {
        const isUserExists = await this.model.findOne<UserDocument>({
            "o_auth.google_id": user.oAuth.googleId,
        });

        if (isUserExists) {
            return;
        }

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
            project_id: user.projectId,
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
            projectId: document.project_id,
            updatedAt: dayjs(document.updated_at).format("MMM D, YYYY"),
            createdAt: dayjs(document.created_at).format("MMM D, YYYY"),
        };
    }
}
