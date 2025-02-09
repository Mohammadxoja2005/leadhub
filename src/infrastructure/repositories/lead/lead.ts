import {
    LeadCreate,
    LeadUpdate,
    LeadWithContact,
} from "app/application/api/controllers/lead/types";

export interface LeadRepository {
    getAllByProjectId: (params: {
        projectId: string;
        meta: { page: string };
    }) => Promise<LeadWithContact[]>;

    getAllByUserIdAndProjectId: (params: {
        projectId: string;
        userId: string;
        meta: { page: string };
    }) => Promise<LeadWithContact[]>;

    getById: (id: string) => Promise<LeadWithContact[]>;

    create: (lead: LeadCreate) => Promise<void>;

    update: (lead: LeadUpdate) => Promise<void>;

    delete: (id: string) => Promise<void>;
}
