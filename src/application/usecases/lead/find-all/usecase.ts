import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { LeadService } from "../../../services";
import { Lead } from "../../../../domain";

@Injectable()
export class FindAllLeadsUseCase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(userId: string, projectId: string): Promise<Lead[]> {
        return this.leadService.findAllLeads(userId, projectId);
    }
}
