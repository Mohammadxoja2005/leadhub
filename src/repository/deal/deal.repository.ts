import { Deal, DealStatus } from "../../domain/deal/deal.domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DealRepository {
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

    public findAll(): Deal[] {
        return this.dealRepositoryDB;
    }

    public findOne(id: string): Deal {
        return this.dealRepositoryDB.find((deal: Deal) => {
            if (deal._id === id) {
                return deal;
            }
        });
    }

    public create(deal: Deal): Deal {
        this.dealRepositoryDB.push(deal);

        return deal;
    }

    public update(deal: Deal): Deal {
        const dealIndex: number = this.dealRepositoryDB.findIndex((dealUpdate: Deal) => {
            if (dealUpdate._id === deal._id) {
                return dealUpdate;
            }
        });

        this.dealRepositoryDB[dealIndex] = deal;

        return this.dealRepositoryDB[dealIndex];
    }

    public delete(id: string): Deal[] {
        return this.dealRepositoryDB.filter((deal: Deal) => deal._id !== id);
    }
}
