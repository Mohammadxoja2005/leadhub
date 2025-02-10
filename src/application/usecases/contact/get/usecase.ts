import { Inject, Injectable } from "@nestjs/common";
import { Application } from "app/common";
import { ContactService } from "app/application/services";

@Injectable()
export class FindContactUseCase {
    constructor(
        @Inject(Application.Service.Contact)
        private contactService: ContactService,
    ) {}

    public async execute(id: string): Promise<void> {
        await this.contactService.get(id);
    }
}
