import {
    DealCreate,
    DealUpdate,
    DealWithContact,
} from "app/application/api/controllers/deal/types";

export interface DealService {
    create: (deal: DealCreate) => Promise<void>;

    update: (deal: DealUpdate) => Promise<void>;

    delete: (id: string) => Promise<void>;

    getAll: (params: {
        projectId: string;
        userId: string;
        meta: { page: string };
    }) => Promise<DealWithContact[]>;

    get: (id: string) => Promise<DealWithContact[]>;
}
