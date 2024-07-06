import { Lead } from "../../../domain";

export interface LeadFindAll {
    findAllLeads: (userId: string, projectId: string) => Promise<Lead[]>;
}
