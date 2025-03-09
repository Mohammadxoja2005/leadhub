import { Inject, Injectable } from "@nestjs/common";
import { Infrastructure } from "app/common";
import { ContactRepository, UserRepository } from "app/infrastructure/repositories";
import { ContactService } from "./contact";
import {
    ContactBase,
    ContactCreate,
    ContactUpdate,
} from "app/application/api/controllers/contact/types";

@Injectable()
export class ContactServiceImpl implements ContactService {
    constructor(
        @Inject(Infrastructure.Repository.Contact)
        private readonly contactRepository: ContactRepository,
        @Inject(Infrastructure.Repository.User)
        private readonly userRepository: UserRepository,
    ) {}

    public async create(contact: ContactCreate): Promise<void> {
        await this.contactRepository.create(contact);
    }

    public async update(contact: ContactUpdate): Promise<void> {
        await this.contactRepository.update(contact);
    }

    public async delete(id: string): Promise<void> {
        await this.contactRepository.delete(id);
    }

    public async getAll(params: {
        userId: string;
        projectId: string;
        meta: { page: string };
    }): Promise<ContactBase[]> {
        const { userId, projectId, meta } = params;
        const user = await this.userRepository.getById(userId);

        return user.role === "admin"
            ? this.contactRepository.getAllByProjectId({ projectId, meta })
            : this.contactRepository.getAllByUserIdAndProjectId({ userId, projectId, meta });
    }

    public async get(id: string): Promise<ContactBase[]> {
        return this.contactRepository.get(id);
    }
}
