import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { DealService } from "app/application/services";
import { Deal } from "app/domain";

@Injectable()
export class FindAllDealsUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(): Promise<Deal[]> {
        return await this.dealService.getAll();
    }
}
