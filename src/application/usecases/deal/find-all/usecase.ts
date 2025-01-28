import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { DealService } from "../../../services";
import { Deal } from "../../../../domain";

@Injectable()
export class FindAllDealsUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(): Promise<Deal[]> {
        return await this.dealService.findAllDeals();
    }
}
