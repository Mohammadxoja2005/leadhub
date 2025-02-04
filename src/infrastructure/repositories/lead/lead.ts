import { type Lead } from "../../../domain";
import { LeadWithContact } from "../../../application/services/lead/types";

export interface LeadRepository {
    getAllByUserId: (id: string) => Promise<LeadWithContact[]>;

    getAllByUserIdAndProjectId: (id: string, projectId: string) => Promise<LeadWithContact[]>;

    getById: (id: string) => Promise<LeadWithContact>;

    create: (lead: Lead) => Promise<void>;

    update: (lead: Lead) => Promise<void>;

    delete: (id: string) => Promise<void>;
}
