import { Inject, Injectable } from "@nestjs/common";
import { type Contact } from "app/domain";
import { Infrastructure } from "app/common";
import { ContactRepository, UserRepository } from "app/infrastructure/repositories";
import { ContactService } from "./contact";

@Injectable()
export class ContactServiceImpl implements ContactService {
    constructor(
        @Inject(Infrastructure.Repository.Contact)
        private readonly contactRepository: ContactRepository,
        @Inject(Infrastructure.Repository.User) private readonly userRepository: UserRepository,
    ) {}

    public async create(contact: Contact): Promise<Contact> {
        return await this.contactRepository.create(contact);
    }

    public async findAll(userId: string, projectId: string): Promise<Contact[]> {
        const user = await this.userRepository.findById(userId);

        const contacts =
            user.role === "admin"
                ? await this.contactRepository.getAllByProjectId(userId)
                : await this.contactRepository.getAllByUserIdAndProjectId(userId, projectId);

        return contacts;
    }

    public async findOne(id: string): Promise<Contact> {
        return await this.contactRepository.get(id);
    }

    public async update(contact: Contact): Promise<Contact> {
        return await this.contactRepository.update(contact);
    }

    public async delete(id: string): Promise<Contact[]> {
        return await this.contactRepository.delete(id);
    }
}
