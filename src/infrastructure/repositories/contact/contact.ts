import {
    ContactCreate,
    ContactUpdate,
    ContactBase,
} from "app/application/api/controllers/contact/types";

export interface ContactRepository {
    create: (contact: ContactCreate) => Promise<void>;

    update: (contact: ContactUpdate) => Promise<void>;

    delete: (id: string) => Promise<void>;

    getAllByProjectId: (params: {
        projectId: string;
        meta: { page: string };
    }) => Promise<ContactBase[]>;

    getAllByUserIdAndProjectId: (params: {
        userId: string;
        projectId: string;
        meta: { page: string };
    }) => Promise<ContactBase[]>;

    get: (id: string) => Promise<ContactBase[]>;
}
