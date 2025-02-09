import { Inject, Injectable } from "@nestjs/common";
import { Infrastructure } from "app/common";
import { LeadService } from "./lead";
import { LeadRepository, UserRepository } from "app/infrastructure/repositories";
import {
    LeadCreate,
    LeadUpdate,
    LeadWithContact,
} from "app/application/api/controllers/lead/types";

@Injectable()
export class LeadServiceImpl implements LeadService {
    constructor(
        @Inject(Infrastructure.Repository.Lead) private readonly leadRepository: LeadRepository,
        @Inject(Infrastructure.Repository.User) private readonly userRepository: UserRepository,
    ) {}

    public async create(lead: LeadCreate): Promise<void> {
        await this.leadRepository.create(lead);
    }

    public async getAll(params: {
        projectId: string;
        userId: string;
        meta: { page: string };
    }): Promise<LeadWithContact[]> {
        const { projectId, userId, meta } = params;
        const user = await this.userRepository.findById(userId);

        return user.role === "admin"
            ? this.leadRepository.getAllByProjectId({ projectId, meta })
            : this.leadRepository.getAllByUserIdAndProjectId({ userId, projectId, meta });
    }

    public async get(id: string): Promise<LeadWithContact[]> {
        return this.leadRepository.getById(id);
    }

    public async update(lead: LeadUpdate): Promise<void> {
        await this.leadRepository.update(lead);
    }

    public async delete(id: string): Promise<void> {
        await this.leadRepository.delete(id);
    }
}
