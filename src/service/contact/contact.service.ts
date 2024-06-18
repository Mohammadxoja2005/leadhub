import { Inject, Injectable } from "@nestjs/common";
import { ContactRepository, type ContactService } from "../../interfaces";
import { type Contact } from "../../domain";
import { repositoryTokens } from "../../common/tokens/repository.tokens";

@Injectable()
export class ContactServiceImpl implements ContactService {
    constructor(
        @Inject(repositoryTokens.contact) private readonly contactRepository: ContactRepository,
    ) {}

    public async createContact(contact: Contact): Promise<Contact> {
        return await this.contactRepository.create(contact);
    }

    public async findAllContacts(): Promise<Contact[]> {
        return await this.contactRepository.findAll();
    }

    public async findOneContact(id: string): Promise<Contact> {
        return await this.contactRepository.findOne(id);
    }

    public async updateContact(contact: Contact): Promise<Contact> {
        return await this.contactRepository.update(contact);
    }

    public async deleteContact(id: string): Promise<Contact[]> {
        return await this.contactRepository.delete(id);
    }
}
