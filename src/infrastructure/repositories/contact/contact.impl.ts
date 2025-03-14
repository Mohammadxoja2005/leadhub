import { Injectable, NotFoundException } from "@nestjs/common";
import { ContactRepository } from "./contact";
import { InjectModel } from "@nestjs/mongoose";
import { Collections } from "app/infrastructure/schema";
import { Model, Types } from "mongoose";
import {
    ContactCreateDocument,
    ContactDocument,
    ContactHydratedDocument,
} from "app/infrastructure/repositories/contact/document";
import {
    ContactCreate,
    ContactUpdate,
    ContactBase,
} from "app/application/api/controllers/contact/types";
import * as dayjs from "dayjs";

@Injectable()
export class ContactRepositoryImpl implements ContactRepository {
    constructor(
        @InjectModel(Collections.Contact)
        private readonly model: Model<ContactHydratedDocument>,
    ) {}

    public async getAllByProjectId(params: {
        projectId: string;
        meta: { page: string };
    }): Promise<ContactBase[]> {
        const { projectId, meta } = params;
        const { skip, limit } = this.calculatePagination(meta);

        const documents = await this.model
            .find<ContactDocument>({ project_id: projectId })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();

        if (!documents) {
            throw new NotFoundException("Contact not found");
        }

        return documents.map((document: ContactDocument) => this.documentToEntity(document));
    }

    public async getAllByUserIdAndProjectId(params: {
        userId: string;
        projectId: string;
        meta: { page: string };
    }): Promise<ContactBase[]> {
        const { userId, projectId, meta } = params;
        const { skip, limit } = this.calculatePagination(meta);

        const documents = await this.model
            .find<ContactDocument>({
                user_id: new Types.ObjectId(userId),
                project_id: projectId,
            })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();

        if (!documents) {
            throw new NotFoundException("Contact not found");
        }

        return documents.map((document: ContactDocument) => this.documentToEntity(document));
    }

    public async get(id: string): Promise<ContactBase[]> {
        const document = await this.model
            .find<ContactDocument>({
                _id: new Types.ObjectId(id),
            })
            .lean()
            .exec();

        if (!document) {
            throw new NotFoundException("Contact not found");
        }

        return document.map((document: ContactDocument) => this.documentToEntity(document));
    }

    public async create(contact: ContactCreate): Promise<void> {
        await this.model.create<ContactCreateDocument>({
            name: contact.name,
            organization: contact.organization,
            email: contact.email,
            phone: contact.phone,
            project_id: contact.projectId,
            user_id: new Types.ObjectId(contact.userId),
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    public async update(contact: ContactUpdate): Promise<void> {
        await this.model.updateOne(
            {
                _id: new Types.ObjectId(contact.id),
            },
            {
                ...contact,
                updated_at: new Date(),
            },
        );
    }

    public async delete(id: string): Promise<void> {
        await this.model.deleteOne({ _id: new Types.ObjectId(id) });
    }

    private calculatePagination(meta: { page: string }): { skip: number; limit: number } {
        const LIMIT = 20;
        const { page } = meta;

        const pageNumber = page ? parseInt(page) : 1;
        const skip = (pageNumber - 1) * LIMIT;

        return { skip, limit: LIMIT };
    }

    private documentToEntity(document: ContactDocument): ContactBase {
        return {
            id: document._id.toHexString(),
            name: document.name,
            organization: document.organization,
            email: document.email,
            phone: document.phone,
            createdAt: dayjs(document.created_at).format("MMM D, YYYY"),
            updatedAt: dayjs(document.updated_at).format("MMM D, YYYY"),
        };
    }
}
