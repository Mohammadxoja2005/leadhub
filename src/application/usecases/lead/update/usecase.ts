import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { LeadService } from "../../../services";
import { LeadUpdate } from "../../../api/controllers/lead/types";

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
