import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { ContactService } from "app/application/services";
import { ContactBase } from "app/application/api/controllers/contact/types";

@Injectable()
export class GetAllContactsUseCase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(params: {
        userId: string;
        projectId: string;
        meta: { page: string };
    }): Promise<ContactBase[]> {
        return this.contactService.getAll(params);
    }
}
