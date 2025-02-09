import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { ContactService } from "app/application/services";

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
