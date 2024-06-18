import { Inject, Injectable } from "@nestjs/common";
import { DealRepository, type DealService } from "../../interfaces";
import { type Deal } from "../../domain";
import { repositoryTokens } from "../../common/tokens/repository.tokens";

@Injectable()
export class DealServiceImpl implements DealService {
    constructor(@Inject(repositoryTokens.deal) private readonly dealRepository: DealRepository) {}

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
