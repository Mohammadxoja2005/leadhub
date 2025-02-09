import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { LeadWithContact } from "app/application/api/controllers/lead/types";
import { LeadService } from "app/application/services";

@Injectable()
export class GetLeadUsecase {
    constructor(
        @Inject(Application.Service.Lead)
        private readonly leadService: LeadService,
    ) {}

    public async execute(id: string): Promise<LeadWithContact[]> {
        return this.leadService.get(id);
    }
}
