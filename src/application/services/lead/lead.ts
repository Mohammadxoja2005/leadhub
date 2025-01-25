import { type Lead } from "../../../domain";

export interface LeadService {
    createLead: (lead: Lead) => Promise<Lead>;

    updateLead: (lead: Lead) => Promise<Lead>;

    deleteLead: (id: string) => Promise<Lead[]>;

    findOneLead: (id: string) => Promise<Lead>;

    findAllLeads: (userId: string, projectId: string) => Promise<Lead[]>;
}
