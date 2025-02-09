import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { ContactService } from "app/application/services";

@Injectable()
export class FindAllContactsUseCase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(userId: string, projectId: string): Promise<void> {
        await this.contactService.findAll(userId, projectId);
    }
}
