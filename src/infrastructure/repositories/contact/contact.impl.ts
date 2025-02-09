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
import { ObjectId } from "mongodb";

@Injectable()
export class ContactRepositoryImpl implements ContactRepository {
    contactRepositoryDB: Contact[];

    constructor(
        @InjectModel(Collections.Contact)
        private readonly model: Model<ContactHydratedDocument>,
    ) {}

    public async getAllByProjectId(projectId: string): Promise<Contact[]> {
        const contacts = await this.model
            .find<ContactDocument>({ project_id: new ObjectId(projectId) })
            .lean()
            .exec();

        if (!contacts) {
            throw new NotFoundException("Contact not found");
        }

        return contacts.map((contact: ContactDocument) => this.documentToEntity(contact));
    }

    public async getAllByUserIdAndProjectId(userId: string, projectId: string): Promise<Contact[]> {
        const contacts = await this.model
            .find<ContactDocument>({
                user_id: new ObjectId(userId),
                project_id: new ObjectId(projectId),
            })
            .lean()
            .exec();

        if (!contacts) {
            throw new NotFoundException("Contact not found");
        }

        return contacts.map((contact: ContactDocument) => this.documentToEntity(contact));
    }

    public async create(contact: Contact): Promise<void> {
        await this.model.create<ContactCreateDocument>(contact);
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

    public async update(contact: Contact): Promise<Contact> {
        const contactIndex: number = this.contactRepositoryDB.findIndex(
            (contactUpdate: Contact) => {
                if (contactUpdate._id === contact._id) {
                    return contactUpdate;
                }
            },
        );

        this.contactRepositoryDB[contactIndex] = contact;

        return this.contactRepositoryDB[contactIndex];
    }

    public async delete(id: string): Promise<Contact[]> {
        return this.contactRepositoryDB.filter((contact: Contact) => contact._id !== id);
    }

    private documentToEntity(document: ContactDocument): Contact {}
}
