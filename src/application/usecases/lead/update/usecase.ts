import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { LeadService } from "app/application/services";
import { LeadUpdate } from "app/application/api/controllers/lead/types";

@Injectable()
export class UpdateLeadUseCase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(lead: LeadUpdate): Promise<void> {
        await this.leadService.update(lead);
    }
}
