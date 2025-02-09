import { Inject, Injectable } from "@nestjs/common";
import { LeadService } from "../../../services";
import { Application } from "../../../../common/tokens";
import { LeadCreate } from "../../../api/controllers/lead/types";

@Injectable()
export class CreateLeadUseCase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(lead: LeadCreate): Promise<void> {
        await this.leadService.create(lead);
    }
}
