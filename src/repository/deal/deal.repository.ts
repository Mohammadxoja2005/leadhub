import { Deal, DealStatus } from "../../domain";
import { Injectable } from "@nestjs/common";
import { DealRepository } from "../../interfaces";

@Injectable()
export class DealRepositoryImpl implements DealRepository {
    dealRepositoryDB: Deal[];

    constructor() {
        this.dealRepositoryDB = [
            {
                _id: "5349b4ddd2781d08c09890f4",
                first_name: "John",
                last_name: "Doe",
                phone: "+998905879038",
                email: "johndoe@gmail.com",
                organization: "google",
                value: 100.0,
                date: new Date(),
                status: DealStatus.qualified,
            },
        ];
    }

    public async findAll(): Promise<Deal[]> {
        return this.dealRepositoryDB;
    }

    public async findOne(id: string): Promise<Deal> {
        return this.dealRepositoryDB.find((deal: Deal) => {
            if (deal._id === id) {
                return deal;
            }
        });
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
