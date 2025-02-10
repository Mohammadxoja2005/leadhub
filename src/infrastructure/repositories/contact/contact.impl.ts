import { Contact } from "app/domain";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ContactRepository } from "./contact";
import { InjectModel } from "@nestjs/mongoose";
import { Collections } from "app/infrastructure/schema";
import { Model } from "mongoose";
import {
    ContactCreateDocument,
    ContactDocument,
    ContactHydratedDocument,
} from "app/infrastructure/repositories/contact/document";
import { ContactCreate, ContactUpdate } from "app/application/api/controllers/contact/types";
import { ObjectId } from "mongodb";
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
    }): Promise<Contact[]> {
        const { projectId, meta } = params;
        const { skip, limit } = this.calculatePagination(meta);

        const contacts = await this.model
            .find<ContactDocument>({ project_id: new ObjectId(projectId) })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();

        if (!contacts) {
            throw new NotFoundException("Contact not found");
        }

        return contacts.map((contact: ContactDocument) => this.documentToEntity(contact));
    }

    public async getAllByUserIdAndProjectId(params: {
        userId: string;
        projectId: string;
        meta: { page: string };
    }): Promise<Contact[]> {
        const { userId, projectId, meta } = params;
        const { skip, limit } = this.calculatePagination(meta);

        const contacts = await this.model
            .find<ContactDocument>({
                user_id: new ObjectId(userId),
                project_id: new ObjectId(projectId),
            })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();

        if (!contacts) {
            throw new NotFoundException("Contact not found");
        }

        return contacts.map((contact: ContactDocument) => this.documentToEntity(contact));
    }

    public async get(id: string): Promise<Contact[]> {
        const contacts = await this.model
            .find<ContactDocument>({
                _id: new ObjectId(id),
            })
            .lean()
            .exec();

        if (!contacts) {
            throw new NotFoundException("Contact not found");
        }

        return contacts.map((contact: ContactDocument) => this.documentToEntity(contact));
    }

    public async create(contact: ContactCreate): Promise<void> {
        await this.model.create<ContactCreateDocument>({
            name: contact.name,
            organization: contact.organization,
            email: contact.email,
            phone: contact.phone,
            project_id: new ObjectId(contact.projectId),
            user_id: new ObjectId(contact.userId),
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    public async update(contact: ContactUpdate): Promise<void> {
        await this.model.updateOne(
            {
                _id: new ObjectId(contact.id),
                updated_at: new Date(),
            },
            contact,
        );
    }

    public async delete(id: string): Promise<void> {
        await this.model.deleteOne({ _id: new ObjectId(id) });
    }

    private calculatePagination(meta: { page: string }): { skip: number; limit: number } {
        const LIMIT = 20;
        const { page } = meta;

        const pageNumber = page ? parseInt(page) : 1;
        const skip = (pageNumber - 1) * LIMIT;

        return { skip, limit: LIMIT };
    }

    private documentToEntity(document: ContactDocument): Contact {
        return {
            id: document._id.toHexString(),
            name: document.name,
            organization: document.organization,
            email: document.email,
            phone: document.phone,
            projectId: document.project_id.toHexString(),
            userId: document.user_id.toHexString(),
            createdAt: dayjs(document.created_at).format("MMM D, YYYY"),
            updatedAt: dayjs(document.updated_at).format("MMM D, YYYY"),
        };
    }
}
