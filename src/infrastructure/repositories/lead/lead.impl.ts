import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LeadRepository } from "./lead";
import { LeadCreateDocument, LeadHydratedDocument, LeadWithContactDocument } from "./document";
import {
    LeadCreate,
    LeadUpdate,
    LeadWithContact,
} from "app/application/api/controllers/lead/types";
import { Collections } from "app/infrastructure/schema";
import { Model, Types } from "mongoose";
import * as dayjs from "dayjs";

@Injectable()
export class LeadRepositoryImpl implements LeadRepository {
    constructor(
        @InjectModel(Collections.Lead)
        private readonly model: Model<LeadHydratedDocument>,
    ) {}

    public async getAllByProjectId(params: {
        projectId: string;
        meta: { page: string };
    }): Promise<LeadWithContact[]> {
        const { projectId } = params;
        const { page } = params.meta;

        return this.getLeadsByFilter({ project_id: new Types.ObjectId(projectId) }, page);
    }

    public async getAllByUserIdAndProjectId(params: {
        projectId: string;
        userId: string;
        meta: { page: string };
    }): Promise<LeadWithContact[]> {
        const { projectId, userId } = params;
        const { page } = params.meta;

        return this.getLeadsByFilter(
            {
                project_id: new Types.ObjectId(projectId),
                user_id: new Types.ObjectId(userId),
            },
            page,
        );
    }

    public async getById(id: string): Promise<LeadWithContact[]> {
        return this.getLeadsByFilter({ _id: new Types.ObjectId(id) });
    }

    public async create(lead: LeadCreate): Promise<void> {
        await this.model.create<LeadCreateDocument>({
            title: lead.title,
            value: lead.value,
            close_date: lead.closeDate ? new Date(lead.closeDate) : null,
            project_id: lead.projectId,
            user_id: new Types.ObjectId(lead.userId),
            contact_id: new Types.ObjectId(lead.contactId),
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    public async update(lead: LeadUpdate): Promise<void> {
        await this.model.updateOne(
            {
                _id: new Types.ObjectId(lead.id),
                updated_at: new Date(),
            },
            lead,
        );
    }

    public async delete(id: string): Promise<void> {
        await this.model.deleteOne({ _id: new Types.ObjectId(id) });
    }

    private async getLeadsByFilter(
        filter: Record<string, Types.ObjectId>,
        page?: string,
    ): Promise<LeadWithContact[]> {
        const LIMIT = 20;
        const pageNumber = page ? parseInt(page) : 1;
        const skip = (pageNumber - 1) * LIMIT;

        const documents = await this.model
            .aggregate<LeadWithContactDocument>([
                { $match: filter },
                {
                    $lookup: {
                        from: "contacts",
                        localField: "contact_id",
                        foreignField: "_id",
                        as: "contact",
                        pipeline: [
                            {
                                $project: {
                                    name: 1,
                                    phone: 1,
                                    organization: 1,
                                    email: 1,
                                },
                            },
                        ],
                    },
                },
                { $unwind: { path: "$contact", preserveNullAndEmptyArrays: true } },
                {
                    $set: {
                        name: "$contact.name",
                        phone: "$contact.phone",
                        organization: "$contact.organization",
                        email: "$contact.email",
                    },
                },
                { $unset: "contact" },
            ])
            .skip(skip)
            .limit(LIMIT)
            .exec();

        if (!documents) {
            throw new NotFoundException("Lead not found");
        }

        return documents.map((document) => this.documentToEntity(document));
    }

    private documentToEntity(document: LeadWithContactDocument): LeadWithContact {
        return {
            id: document._id.toHexString(),
            title: document.title,
            value: document.value,
            name: document.name,
            organization: document.organization,
            email: document.email,
            phone: document.phone,
            closeDate: dayjs(document.close_date).format("MMM D, YYYY"),
            contactId: document.contact_id.toHexString(),
            createdAt: dayjs(document.created_at).format("MMM D, YYYY"),
            updatedAt: dayjs(document.updated_at).format("MMM D, YYYY"),
        };
    }
}
