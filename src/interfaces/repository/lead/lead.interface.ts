import { Repository } from "../index.interface";
import { Lead } from "../../../domain";

export interface LeadRepository extends Repository<Lead> {
    create(lead: Lead): Promise<Lead>;

    update(lead: Lead): Promise<Lead>;

    delete(id: string): Promise<Lead[]>;
}
