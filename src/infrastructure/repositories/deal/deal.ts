import { type Deal } from "app/domain";
import { DealWithContact } from "app/application/api/controllers/deal/types";

export interface DealRepository {
    create: (deal: Deal) => Promise<void>;

    update: (deal: Deal) => Promise<void>;

    delete: (id: string) => Promise<void>;

    getAllByUserIdAndProjectId: (params: {
        projectId: string;
        userId: string;
        meta: { page: string };
    }) => Promise<DealWithContact[]>;

    get: (id: string) => Promise<DealWithContact[]>;
}
