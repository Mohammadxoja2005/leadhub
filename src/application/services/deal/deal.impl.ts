import { Inject, Injectable } from "@nestjs/common";
import { DealRepository } from "app/infrastructure/repositories";
import { Infrastructure } from "app/common";
import { DealService } from "./deal";
import {
    DealCreate,
    DealUpdate,
    DealWithContact,
} from "app/application/api/controllers/deal/types";

@Injectable()
export class DealServiceImpl implements DealService {
    constructor(
        @Inject(Infrastructure.Repository.Deal) private readonly dealRepository: DealRepository,
    ) {}

    public async create(deal: DealCreate): Promise<void> {
        await this.dealRepository.create(deal);
    }

    public async getAll(params: {
        projectId: string;
        userId: string;
        meta: { page: string };
    }): Promise<DealWithContact[]> {
        return this.dealRepository.getAllByUserIdAndProjectId(params);
    }

    public async get(id: string): Promise<DealWithContact[]> {
        return this.dealRepository.get(id);
    }

    public async update(deal: DealUpdate): Promise<void> {
        await this.dealRepository.update(deal);
    }

    public async delete(id: string): Promise<void> {
        await this.dealRepository.delete(id);
    }
}
