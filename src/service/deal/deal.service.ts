import { Injectable } from "@nestjs/common";
import { DealRepository } from "../../repository";
import { Deal } from "../../domain";

@Injectable()
export class DealService {
    constructor(private readonly dealRepository: DealRepository) {}

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
