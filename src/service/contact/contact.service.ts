import { Injectable } from "@nestjs/common";
import { ContactRepository } from "../../interfaces";
import { Contact } from "../../domain";

@Injectable()
export class ContactService {
    constructor(private readonly contactRepository: ContactRepository) {}

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
