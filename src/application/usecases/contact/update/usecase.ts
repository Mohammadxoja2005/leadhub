import { Inject, Injectable } from "@nestjs/common";
import { Application } from "../../../../common/tokens";
import { ContactService } from "../../../services";
import { Contact } from "../../../../domain";

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
