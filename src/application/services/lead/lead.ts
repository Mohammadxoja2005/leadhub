import {
    LeadCreate,
    LeadUpdate,
    LeadWithContact,
} from "app/application/api/controllers/lead/types";

export interface LeadService {
    create: (lead: LeadCreate) => Promise<void>;

    update: (lead: LeadUpdate) => Promise<void>;

    delete: (id: string) => Promise<void>;

    get: (id: string) => Promise<LeadWithContact[]>;

    getAll: (params: {
        projectId: string;
        userId: string;
        meta: { page: string };
    }) => Promise<LeadWithContact[]>;
}
