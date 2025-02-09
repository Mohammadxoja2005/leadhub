import { LeadCreate, LeadUpdate, LeadWithContact } from "../../api/controllers/lead/types";

export interface LeadService {
    create: (lead: LeadCreate) => Promise<void>;

    update: (lead: LeadUpdate) => Promise<void>;

    delete: (id: string) => Promise<void>;

    get: (id: string) => Promise<LeadWithContact[]>;

    getAll: (userId: string, projectId: string) => Promise<LeadWithContact[]>;
}
