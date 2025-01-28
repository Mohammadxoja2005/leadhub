import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { DealService } from "../../../services";

@Injectable()
export class DeleteDealUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(dealId: string): Promise<void> {
        await this.dealService.deleteDeal(dealId);
    }
}
