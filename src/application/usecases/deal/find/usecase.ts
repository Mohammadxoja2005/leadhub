import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { DealService } from "app/application/services";
import { Deal } from "app/domain";

@Injectable()
export class FindDealUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(dealId: string): Promise<Deal> {
        return this.dealService.get(dealId);
    }
}
