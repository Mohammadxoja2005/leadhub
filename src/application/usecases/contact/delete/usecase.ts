import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { ContactService } from "../../../services";

@Injectable()
export class DeleteContactUseCase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(contactId: string): Promise<void> {
        await this.contactService.delete(contactId);
    }
}
