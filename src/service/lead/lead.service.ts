import { Inject, Injectable } from "@nestjs/common";
import { LeadRepository, LeadService } from "../../interfaces";
import { Lead } from "../../domain";
import { repositoryTokens } from "../../common/tokens/repository.tokens";

@Injectable()
export class LeadServiceImpl implements LeadService {
    constructor(@Inject(repositoryTokens.lead) private readonly leadRepository: LeadRepository) {}

    public async createLead(lead: Lead): Promise<Lead> {
        return await this.leadRepository.create(lead);
    }

    public async findAllLeads(): Promise<Lead[]> {
        return await this.leadRepository.findAll();
    }

    public async findOneLead(id: string): Promise<Lead> {
        return await this.leadRepository.findOne(id);
    }

    public async updateLead(lead: Lead): Promise<Lead> {
        return await this.leadRepository.update(lead);
    }

    public async deleteLead(id: string): Promise<Lead[]> {
        return await this.leadRepository.delete(id);
    }
}
