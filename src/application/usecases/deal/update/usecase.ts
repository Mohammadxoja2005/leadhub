import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { DealService } from "app/application/services";
import { DealUpdate } from "app/application/api/controllers/deal/types";

@Injectable()
export class UpdateDealUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(deal: DealUpdate): Promise<void> {
        await this.dealService.update(deal);
    }
}
