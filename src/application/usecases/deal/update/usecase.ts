import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { DealService } from "app/application/services";
import { Deal } from "app/domain";

@Injectable()
export class UpdateDealUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(deal: Deal): Promise<void> {
        await this.dealService.updateDeal(deal);
    }
}
