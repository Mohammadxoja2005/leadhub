import { Inject, Injectable } from "@nestjs/common";
import { DealRepository } from "app/infrastructure/repositories";
import { type Deal } from "app/domain";
import { Infrastructure } from "app/common";
import { DealService } from "./deal";

@Injectable()
export class DealServiceImpl implements DealService {
    constructor(
        @Inject(Infrastructure.Repository.Deal) private readonly dealRepository: DealRepository,
    ) {}

    public async createDeal(deal: Deal): Promise<Deal> {
        return await this.dealRepository.create(deal);
    }

    public async findAllDeals(): Promise<Deal[]> {
        return await this.dealRepository.getAllByUserIdAndProjectId();
    }

    public async findOneDeal(id: string): Promise<Deal> {
        return await this.dealRepository.get(id);
    }

    public async updateDeal(deal: Deal): Promise<Deal> {
        return await this.dealRepository.update(deal);
    }

    public async deleteDeal(id: string): Promise<Deal[]> {
        return await this.dealRepository.delete(id);
    }
}
