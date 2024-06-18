import { type Deal } from "../../../domain";

export interface DealRepository {
    create: (deal: Deal) => Promise<Deal>;

    update: (deal: Deal) => Promise<Deal>;

    delete: (id: string) => Promise<Deal[]>;

    findAll: () => Promise<Deal[]>;

    findOne: (id: string) => Promise<Deal>;
}
