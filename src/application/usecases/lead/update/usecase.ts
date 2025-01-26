import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { LeadService } from "../../../services";
import { Lead } from "../../../../domain";

@Injectable()
export class UpdateLeadUseCase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(lead: Lead): Promise<void> {
        await this.leadService.updateLead(lead);
    }
}
