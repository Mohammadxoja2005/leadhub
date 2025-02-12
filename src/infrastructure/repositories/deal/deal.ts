import { type Deal } from "app/domain";

export interface DealRepository {
    create: (deal: Deal) => Promise<Deal>;

    update: (deal: Deal) => Promise<Deal>;

    delete: (id: string) => Promise<Deal[]>;

    getAllByUserIdAndProjectId: () => Promise<Deal[]>;

    findOne: (id: string) => Promise<Deal>;
}
