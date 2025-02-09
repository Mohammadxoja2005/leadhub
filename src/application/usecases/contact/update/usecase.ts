import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { ContactService } from "app/application/services";
import { Contact } from "app/domain";

@Injectable()
export class UpdateContactUsecase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(contact: Contact): Promise<void> {
        await this.contactService.update(contact);
    }
}
