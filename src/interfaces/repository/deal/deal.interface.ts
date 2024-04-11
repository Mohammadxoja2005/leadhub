import { Repository } from "../index.interface";
import { Deal } from "../../../domain";

export interface DealRepository extends Repository<Deal> {
    create(deal: Deal): Promise<Deal>;

    update(deal: Deal): Promise<Deal>;

    delete(id: string): Promise<Deal[]>;
}
