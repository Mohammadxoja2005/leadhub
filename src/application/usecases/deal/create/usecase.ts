import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { DealService } from "../../../services";
import type { Deal } from "../../../../domain";

@Injectable()
export class CreateDealUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(deal: Deal): Promise<void> {
        await this.dealService.createDeal(deal);
    }
}
