import { type Lead } from "../../../domain";

export interface LeadRepository {
    create: (lead: Lead) => Promise<Lead>;

    update: (lead: Lead) => Promise<Lead>;

    delete: (id: string) => Promise<Lead[]>;

    findAllByUserId: (id: string) => Promise<Lead[]>;

    findAllByUserIdAndProjectId: (id: string, projectId: string) => Promise<Lead[]>;

    findOne: (id: string) => Promise<Lead>;
}
