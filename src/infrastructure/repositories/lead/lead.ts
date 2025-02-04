import { type Lead } from "../../../domain";

export interface LeadRepository {
    getAllByUserId: (id: string) => Promise<Lead[]>;

    getAllByUserIdAndProjectId: (id: string, projectId: string) => Promise<Lead[]>;

    getById: (id: string) => Promise<Lead>;

    create: (lead: Lead) => Promise<void>;

    update: (lead: Lead) => Promise<void>;

    delete: (id: string) => Promise<void>;
}
