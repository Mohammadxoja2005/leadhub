import { Deal } from "../../../domain";

export interface DealService {
    createDeal(deal: Deal): Promise<Deal>;

    updateDeal(deal: Deal): Promise<Deal>;

    deleteDeal(id: string): Promise<Deal[]>;

    findAllDeals(): Promise<Deal[]>;

    findOneDeal(id: string): Promise<Deal>;
}
