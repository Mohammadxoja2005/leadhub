import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { DealService } from "app/application/services";
import { DealCreate } from "app/application/api/controllers/deal/types";

@Injectable()
export class CreateDealUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(deal: DealCreate): Promise<void> {
        await this.dealService.create(deal);
    }
}
