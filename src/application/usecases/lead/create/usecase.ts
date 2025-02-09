import { Inject, Injectable } from "@nestjs/common";
import { LeadService } from "app/application/services";
import { Application } from "app/common";
import { LeadCreate } from "app/application/api/controllers/lead/types";

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
