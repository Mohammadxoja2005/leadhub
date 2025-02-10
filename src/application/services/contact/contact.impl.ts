import { Inject, Injectable } from "@nestjs/common";
import { Contact } from "app/domain";
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

    public async create(contact: Contact): Promise<void> {
        await this.contactRepository.create(contact);
    }

    public async update(contact: Contact): Promise<void> {
        await this.contactRepository.update(contact);
    }

    public async delete(id: string): Promise<void> {
        await this.contactRepository.delete(id);
    }

    public async getAll(params: {
        userId: string;
        projectId: string;
        meta: { page: string };
    }): Promise<Contact[]> {
        const { userId, projectId, meta } = params;
        const user = await this.userRepository.findById(userId);

        return user.role === "admin"
            ? this.contactRepository.getAllByProjectId({ projectId, meta })
            : this.contactRepository.getAllByUserIdAndProjectId({ userId, projectId, meta });
    }

    public async get(id: string): Promise<Contact[]> {
        return this.contactRepository.get(id);
    }
}
