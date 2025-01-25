import { type Contact } from "../../../domain";

export interface ContactService {
    createContact: (contact: Contact) => Promise<Contact>;

    updateContact: (contact: Contact) => Promise<Contact>;

    deleteContact: (id: string) => Promise<Contact[]>;

    findAllContacts: (userId: string, projectId: string) => Promise<Contact[]>;

    findOneContact: (id: string) => Promise<Contact>;
}
