import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { DealService } from "app/application/services";
import { DealWithContact } from "app/application/api/controllers/deal/types";

@Injectable()
export class GetAllDealsUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(params: {
        projectId: string;
        userId: string;
        meta: { page: string };
    }): Promise<DealWithContact[]> {
        return this.dealService.getAll(params);
    }
}
