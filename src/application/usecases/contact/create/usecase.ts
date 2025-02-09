import { Inject, Injectable } from "@nestjs/common";
import { ContactService } from "app/application/services";
import { Application } from "app/common";
import { Contact } from "app/domain";

@Injectable()
export class CreateContactUseCase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(contact: Contact): Promise<void> {
        await this.contactService.create(contact);
    }
}
