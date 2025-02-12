import { Inject, Injectable } from "@nestjs/common";
import { ContactService } from "app/application/services";
import { Application } from "app/common";
import { ContactCreate } from "app/application/api/controllers/contact/types";

@Injectable()
export class CreateContactUseCase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(contact: ContactCreate): Promise<void> {
        await this.contactService.create(contact);
    }
}
