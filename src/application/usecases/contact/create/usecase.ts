import { Inject, Injectable } from "@nestjs/common";
import { ContactService } from "../../../services";
import { Application } from "../../../../common/tokens";
import { Contact } from "../../../../domain";

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
