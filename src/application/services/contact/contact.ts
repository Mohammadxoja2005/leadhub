import { type Contact } from "../../../domain";

export interface ContactService {
    create: (contact: Contact) => Promise<Contact>;

    update: (contact: Contact) => Promise<Contact>;

    delete: (id: string) => Promise<Contact[]>;

    findAll: (userId: string, projectId: string) => Promise<Contact[]>;

    findOne: (id: string) => Promise<Contact>;
}
