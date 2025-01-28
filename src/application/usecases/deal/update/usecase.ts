import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { DealService } from "../../../services";
import { Deal } from "../../../../domain";

@Injectable()
export class UpdateDealUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(deal: Deal): Promise<void> {
        await this.dealService.updateDeal(deal);
    }
}
