import { Contact } from "app/domain";

export interface ContactRepository {
    create: (contact: Contact) => Promise<void>;

    update: (contact: Contact) => Promise<void>;

    delete: (id: string) => Promise<void>;

    getAllByProjectId: (projectId: string) => Promise<Contact[]>;

    getAllByUserIdAndProjectId: (userId: string, projectId: string) => Promise<Contact[]>;

    get: (id: string) => Promise<Contact[]>;
}
