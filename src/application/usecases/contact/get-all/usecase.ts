import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { ContactService } from "app/application/services";

@Injectable()
export class FindAllContactsUseCase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(params: {
        userId: string;
        projectId: string;
        meta: { page: string };
    }): Promise<void> {
        await this.contactService.getAll(params);
    }
}
