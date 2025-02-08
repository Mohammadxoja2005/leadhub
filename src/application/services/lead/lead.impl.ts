import { Inject, Injectable } from "@nestjs/common";
import { type Lead } from "../../../domain";
import { Infrastructure } from "../../../common/tokens";
import { LeadService } from "./lead";
import { LeadRepository, UserRepository } from "../../../infrastructure/repositories";

@Injectable()
export class LeadServiceImpl implements LeadService {
    constructor(
        @Inject(Infrastructure.Repository.Lead) private readonly leadRepository: LeadRepository,
        @Inject(Infrastructure.Repository.User) private readonly userRepository: UserRepository,
    ) {}

    public async createLead(lead: Lead): Promise<Lead> {
        return await this.leadRepository.create(lead);
    }

    public async findAllLeads(userId: string, projectId: string): Promise<Lead[]> {
        const user = await this.userRepository.findById(userId);

        const leads =
            user.role === "admin"
                ? await this.leadRepository.getAllByProjectId(userId)
                : await this.leadRepository.getAllByUserIdAndProjectId(userId, projectId);

        return leads;
    }

    public async findOneLead(id: string): Promise<Lead> {
        return await this.leadRepository.getById(id);
    }

    public async updateLead(lead: Lead): Promise<Lead> {
        return await this.leadRepository.update(lead);
    }

    public async deleteLead(id: string): Promise<Lead[]> {
        return await this.leadRepository.delete(id);
    }
}
