import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { DealService } from "app/application/services";

@Injectable()
export class DeleteDealUseCase {
    constructor(@Inject(Application.Service.Deal) private readonly dealService: DealService) {}

    public async execute(id: string): Promise<void> {
        await this.dealService.delete(id);
    }
}
