import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { ContactService } from "app/application/services";
import { ContactUpdate } from "app/application/api/controllers/contact/types";

@Injectable()
export class UpdateContactUseCase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(contact: ContactUpdate): Promise<void> {
        await this.contactService.update(contact);
    }
}
