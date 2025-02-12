import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { ContactService } from "app/application/services";
import { ContactBase } from "app/application/api/controllers/contact/types";

@Injectable()
export class GetContactUseCase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(id: string): Promise<ContactBase[]> {
        return await this.contactService.get(id);
    }
}
