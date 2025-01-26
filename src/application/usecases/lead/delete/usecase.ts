import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { LeadService } from "../../../services";

@Injectable()
export class DeleteLeadUsecase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(leadId: string): Promise<void> {
        await this.leadService.deleteLead(leadId);
    }
}
