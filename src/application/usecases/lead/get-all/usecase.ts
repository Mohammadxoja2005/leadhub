import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { LeadService } from "app/application/services";
import { LeadWithContact } from "app/application/api/controllers/lead/types";

@Injectable()
export class GetAllLeadsUseCase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(params: {
        userId: string;
        projectId: string;
        meta: { page: string };
    }): Promise<LeadWithContact[]> {
        return this.leadService.getAll(params);
    }
}
