import { Injectable, NotFoundException } from "@nestjs/common";
import { type DealRepository } from "./deal";
import { InjectModel } from "@nestjs/mongoose";
import { Collections } from "app/infrastructure/schema";
import { Model, Types } from "mongoose";
import {
    DealCreateDocument,
    DealHydratedDocument,
    DealWithContactDocument,
} from "app/infrastructure/repositories/deal/document";
import {
    DealCreate,
    DealUpdate,
    DealWithContact,
} from "app/application/api/controllers/deal/types";
import * as dayjs from "dayjs";
import { ObjectId } from "mongodb";

@Injectable()
export class DealRepositoryImpl implements DealRepository {
    constructor(
        @InjectModel(Collections.Deal)
        private readonly model: Model<DealHydratedDocument>,
    ) {}

    public async getAllByUserIdAndProjectId(params: {
        projectId: string;
        userId: string;
        meta: { page: string };
    }): Promise<DealWithContact[]> {
        const { projectId, userId } = params;
        const { page } = params.meta;

        return this.getDealsByFilter(
            {
                user_id: new Types.ObjectId(userId),
                project_id: new Types.ObjectId(projectId),
            },
            page,
        );
    }

    public async get(id: string): Promise<DealWithContact[]> {
        return this.getDealsByFilter({ user_id: new Types.ObjectId(id) });
    }

    public async create(deal: DealCreate): Promise<void> {
        await this.model.create<DealCreateDocument>({
            title: deal.title,
            value: deal.value,
            close_date: deal.closeDate ? new Date(deal.closeDate) : null,
            project_id: new Types.ObjectId(deal.projectId),
            user_id: new Types.ObjectId(deal.userId),
            contact_id: new Types.ObjectId(deal.contactId),
            status: deal.status,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    public async update(deal: DealUpdate): Promise<void> {
        await this.model.updateOne(
            {
                _id: new ObjectId(deal.id),
                updated_at: new Date(),
            },
            deal,
        );
    }

    public async delete(id: string): Promise<void> {
        await this.model.deleteOne({ _id: new ObjectId(id) });
    }

    private async getDealsByFilter(
        filter: Record<string, Types.ObjectId>,
        page?: string,
    ): Promise<DealWithContact[]> {
        const LIMIT = 20;
        const pageNumber = page ? parseInt(page) : 1;
        const skip = (pageNumber - 1) * LIMIT;

        const documents = await this.model
            .aggregate<DealWithContactDocument>([
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
            throw new NotFoundException("Deal not found");
        }

        return documents.map((document) => this.documentToEntity(document));
    }

    private documentToEntity(document: DealWithContactDocument): DealWithContact {
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
            status: document.status,
            createdAt: dayjs(document.created_at).format("MMM D, YYYY"),
            updatedAt: dayjs(document.updated_at).format("MMM D, YYYY"),
        };
    }
}
