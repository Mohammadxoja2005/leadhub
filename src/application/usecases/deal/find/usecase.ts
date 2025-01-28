import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { DealService } from "../../../services";
import { Deal } from "../../../../domain";

@Injectable()
export class FindDealUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(dealId: string): Promise<Deal> {
        return this.dealService.findOneDeal(dealId);
    }
}
