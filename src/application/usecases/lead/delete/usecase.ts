import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { LeadService } from "app/application/services";

@Injectable()
export class DeleteLeadUsecase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(id: string): Promise<void> {
        await this.leadService.delete(id);
    }
}
