import { Deal } from "app/domain";
import { Injectable, NotFoundException } from "@nestjs/common";
import { type DealRepository } from "./deal";
import { InjectModel } from "@nestjs/mongoose";
import { Collections } from "app/infrastructure/schema";
import { Model } from "mongoose";
import { DealHydratedDocument } from "app/infrastructure/repositories/deal/document";

@Injectable()
export class DealRepositoryImpl implements DealRepository {
    constructor(
        @InjectModel(Collections.Deal)
        private readonly model: Model<DealHydratedDocument>,
    ) {}

    public async getAllByUserIdAndProjectId(): Promise<Deal[]> {
        return this.dealRepositoryDB;
    }

    public async findOne(id: string): Promise<Deal> {
        const deal = this.dealRepositoryDB.find((deal: Deal) => {
            if (deal._id === id) {
                return deal;
            }
        });

        if (deal === undefined) {
            throw new NotFoundException("Lead not found");
        }

        return deal;
    }

    public async create(deal: Deal): Promise<Deal> {
        this.dealRepositoryDB.push(deal);

        return deal;
    }

    public async update(deal: Deal): Promise<Deal> {
        const dealIndex: number = this.dealRepositoryDB.findIndex((dealUpdate: Deal) => {
            if (dealUpdate._id === deal._id) {
                return dealUpdate;
            }
        });

        this.dealRepositoryDB[dealIndex] = deal;

        return this.dealRepositoryDB[dealIndex];
    }

    public async delete(id: string): Promise<Deal[]> {
        return this.dealRepositoryDB.filter((deal: Deal) => deal._id !== id);
    }
}
