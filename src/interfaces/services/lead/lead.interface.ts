import { Lead } from "../../../domain";

export interface LeadService {
    createLead(lead: Lead): Promise<Lead>;

    updateLead(lead: Lead): Promise<Lead>;

    deleteLead(id: string): Promise<Lead[]>;

    findAllLeads(): Promise<Lead[]>;

    findOneLead(id: string): Promise<Lead>;
}
