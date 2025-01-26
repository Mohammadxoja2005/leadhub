import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { LeadService } from "../../../services";
import { Lead } from "../../../../domain";

@Injectable()
export class FindLeadUsecase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(leadId: string): Promise<Lead> {
        return this.leadService.findOneLead(leadId);
    }
}
