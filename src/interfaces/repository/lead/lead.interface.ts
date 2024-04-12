import { Lead } from "../../../domain";

export interface LeadRepository {
    create(lead: Lead): Promise<Lead>;

    update(lead: Lead): Promise<Lead>;

    delete(id: string): Promise<Lead[]>;

    findAll(): Promise<Lead[]>;

    findOne(id: string): Promise<Lead>;
}
