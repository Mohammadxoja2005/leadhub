import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { LeadService } from "../../../services";
import { LeadWithContact } from "../../../api/controllers/lead/types";

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
