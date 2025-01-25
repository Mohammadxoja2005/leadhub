import { Contact } from "../../../domain";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ContactRepository } from "./contact";

@Injectable()
export class ContactRepositoryImpl implements ContactRepository {
    contactRepositoryDB: Contact[];

    constructor() {
        this.contactRepositoryDB = [
            {
                _id: "5349b4ddd2781d08c09890f4",
                name: "John",
                organization: "google",
                email: "john@gmail.com",
                phone: "+998903470144",
                project_id: "134",
                user_id: "5349b4ddd2781d08c09890f4",
            },
        ];
    }

    public async findAllByUserId(userId: string): Promise<Contact[]> {
        const contacts = this.contactRepositoryDB.filter((contact: Contact) => {
            if (contact.user_id === userId) {
                return contact;
            }
        });

        if (contacts === undefined) {
            throw new NotFoundException("Lead not found");
        }

        return contacts;
    }

    public async findAllByUserIdAndProjectId(userId: string, projectId): Promise<Contact[]> {
        const contacts = this.contactRepositoryDB.filter((contact: Contact) => {
            if (contact.user_id === userId && contact.project_id === projectId) {
                return contact;
            }
        });

        if (contacts === undefined) {
            throw new NotFoundException("Lead not found");
        }

        return contacts;
    }

    public async create(contact: Contact): Promise<Contact> {
        this.contactRepositoryDB.push(contact);

        return contact;
    }

    public async findOne(id: string): Promise<Contact> {
        const contact = this.contactRepositoryDB.find((contact: Contact) => {
            if (contact._id === id) {
                return contact;
            }
        });

        if (contact === undefined) {
            throw new NotFoundException("Contact not found");
        }

        return contact;
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
}
