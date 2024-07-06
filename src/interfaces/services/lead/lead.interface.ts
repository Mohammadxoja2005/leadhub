import { type Lead } from "../../../domain";
import { LeadFindAll } from "./lead-find-all.interface";

export interface LeadService extends LeadFindAll {
    createLead: (lead: Lead) => Promise<Lead>;

    updateLead: (lead: Lead) => Promise<Lead>;

    deleteLead: (id: string) => Promise<Lead[]>;

    findOneLead: (id: string) => Promise<Lead>;
}
