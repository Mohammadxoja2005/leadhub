import { Inject, Injectable } from "@nestjs/common";
import { DealRepository } from "../../../infrastructure/repositories";
import { type Deal } from "../../../domain";
import { Infrastructure } from "../../../common/tokens";
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
        return await this.dealRepository.findAll();
    }

    public async findOneDeal(id: string): Promise<Deal> {
        return await this.dealRepository.findOne(id);
    }

    public async updateDeal(deal: Deal): Promise<Deal> {
        return await this.dealRepository.update(deal);
    }

    public async deleteDeal(id: string): Promise<Deal[]> {
        return await this.dealRepository.delete(id);
    }
}
