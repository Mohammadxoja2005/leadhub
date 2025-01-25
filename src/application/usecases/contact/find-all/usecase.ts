import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { ContactService } from "../../../services";

@Injectable()
export class FindAllContactsUseCase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(userId: string, projectId: string): Promise<void> {
        await this.contactService.findAll(userId, projectId);
    }
}
