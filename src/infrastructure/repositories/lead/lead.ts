import {
    LeadCreate,
    LeadUpdate,
    LeadWithContact,
} from "app/application/api/controllers/lead/types";

export interface LeadRepository {
    getAllByProjectId: (id: string) => Promise<LeadWithContact[]>;

    getAllByUserIdAndProjectId: (id: string, projectId: string) => Promise<LeadWithContact[]>;

    getById: (id: string) => Promise<LeadWithContact[]>;

    create: (lead: LeadCreate) => Promise<void>;

    update: (lead: LeadUpdate) => Promise<void>;

    delete: (id: string) => Promise<void>;
}
