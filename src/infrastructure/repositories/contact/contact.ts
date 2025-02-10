import { Contact } from "app/domain";
import { ContactCreate, ContactUpdate } from "app/application/api/controllers/contact/types";

export interface ContactRepository {
    create: (contact: ContactCreate) => Promise<void>;

    update: (contact: ContactUpdate) => Promise<void>;

    delete: (id: string) => Promise<void>;

    getAllByProjectId: (params: {
        projectId: string;
        meta: { page: string };
    }) => Promise<Contact[]>;

    getAllByUserIdAndProjectId: (params: {
        userId: string;
        projectId: string;
        meta: { page: string };
    }) => Promise<Contact[]>;

    get: (id: string) => Promise<Contact[]>;
}
