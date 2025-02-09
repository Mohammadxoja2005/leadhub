import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { LeadService } from "../../../services";
import { LeadWithContact } from "../../../api/controllers/lead/types";

@Injectable()
export class GetAllLeadsUseCase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(userId: string, projectId: string): Promise<LeadWithContact[]> {
        return this.leadService.getAll(userId, projectId);
    }
}
