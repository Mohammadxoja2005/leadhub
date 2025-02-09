import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { DealService } from "app/application/services";

@Injectable()
export class DeleteDealUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(dealId: string): Promise<void> {
        await this.dealService.deleteDeal(dealId);
    }
}
