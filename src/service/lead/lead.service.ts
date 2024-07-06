import { Inject, Injectable } from "@nestjs/common";
import { LeadRepository, type LeadService, UserRepository } from "../../interfaces";
import { type Lead } from "../../domain";
import { repositoryTokens } from "../../common/tokens/repository.tokens";

@Injectable()
export class LeadServiceImpl implements LeadService {
    constructor(
        @Inject(repositoryTokens.lead) private readonly leadRepository: LeadRepository,
        @Inject(repositoryTokens.user) private readonly userRepository: UserRepository,
    ) {}

    public async createLead(lead: Lead): Promise<Lead> {
        return await this.leadRepository.create(lead);
    }

    public async findAllLeads(userId: string, projectId: string): Promise<Lead[]> {
        const user = await this.userRepository.findById(userId);

        const foundedLeads =
            user.role === "admin"
                ? await this.leadRepository.findAllByUserId(userId)
                : await this.leadRepository.findAllByUserIdAndProjectId(userId, projectId);

        return foundedLeads;
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
