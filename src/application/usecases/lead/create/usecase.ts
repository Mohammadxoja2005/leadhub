import { Inject, Injectable } from "@nestjs/common";
import { LeadService } from "../../../services";
import { Application } from "../../../../common/tokens";
import { Lead } from "../../../../domain";

@Injectable()
export class CreateLeadUseCase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(lead: Lead): Promise<void> {
        await this.leadService.createLead(lead);
    }
}
