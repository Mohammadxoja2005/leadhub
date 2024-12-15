import { type Contact } from "../../../domain";

export interface ContactRepository {
    create: (contact: Contact) => Promise<Contact>;

    update: (contact: Contact) => Promise<Contact>;

    delete: (id: string) => Promise<Contact[]>;

    findAllByUserId: (userId: string) => Promise<Contact[]>;

    findAllByUserIdAndProjectId: (userId: string, projectId: string) => Promise<Contact[]>;

    findOne: (id: string) => Promise<Contact>;
}
