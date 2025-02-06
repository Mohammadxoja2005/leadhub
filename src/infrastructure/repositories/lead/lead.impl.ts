import { Injectable, NotFoundException } from "@nestjs/common";
import { Lead } from "../../../domain";
import { LeadRepository } from "./lead";
import { LeadDocument, LeadHydratedDocument } from "./document";
import { ObjectId } from "mongodb";
import { LeadWithContact } from "../../../application/services/lead/types";
import { Collections } from "../../schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class LeadRepositoryImpl implements LeadRepository {
    private readonly leadRepositoryDB: LeadHydratedDocument[];

    // TODO need to return data of contacts in leads
    constructor(
        @InjectModel(Collections.Lead)
        private readonly model: Model<LeadHydratedDocument>,
    ) {
        this.leadRepositoryDB = [
            {
                _id: new ObjectId("5349b4ddd2781108c09890f4"),
                title: "Dan Wu lead",
                value: 700.99,
                closeDate: Date.now(),
                project_id: new ObjectId("5349b4ddd2781d08c09890f4"),
                user_id: new ObjectId("5349b4ddd2781d08c09890f4"),
                contact_id: new ObjectId("5349b4ddd2781d08c09890f4"),
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        ];
    }

    public async getAllByUserId(userId: string): Promise<LeadWithContact[]> {
        const documents = await this.model
            .aggregate<LeadWithContact>([
                {
                    $lookup: {
                        from: "contacts",
                        localField: "contactId",
                        foreignField: "_id",
                        as: "contact",
                    },
                },
                {
                    $unwind: "$contact",
                },
            ])
            .exec();

        // const documents = this.leadRepositoryDB.filter((document: LeadDocument) => {
        //     if (document.user_id.toHexString() === userId) {
        //         return document;
        //     }
        // });

        if (!documents) {
            throw new NotFoundException("Lead not found");
        }

        return documents.map((document) => this.documentEntity(document));
    }

    public async getAllByUserIdAndProjectId(
        userId: string,
        projectId: string,
    ): Promise<LeadWithContact[]> {
        const documents = this.leadRepositoryDB.filter((lead: LeadDocument) => {
            if (
                lead.user_id.toHexString() === userId &&
                lead.project_id.toHexString() === projectId
            ) {
                return lead;
            }
        });

        if (!documents) {
            throw new NotFoundException("Lead not found");
        }

        return documents.map((document) => this.documentEntity(document));
    }

    public async getById(id: string): Promise<LeadWithContact> {
        const document = this.leadRepositoryDB.find((document: LeadDocument) => {
            if (document._id.toHexString() === id) {
                return document;
            }
        });

        if (!document) {
            throw new NotFoundException("Lead not found");
        }

        return this.documentEntity(document);
    }

    public async create(lead: Lead): Promise<void> {
        this.leadRepositoryDB.push(lead as never);
    }

    public async update(lead: Lead): Promise<void> {
        const documentIndex = this.leadRepositoryDB.findIndex((document: LeadDocument) => {
            if (document._id.toHexString() === lead.id) {
                return document;
            }
        });

        this.leadRepositoryDB[documentIndex] = lead as never;
    }

    public async delete(id: string): Promise<void> {
        this.leadRepositoryDB.filter((document: LeadDocument) => document._id.toHexString() !== id);
    }

    private documentEntity(document: LeadDocument): LeadWithContact {
        return {
            id: document._id.toHexString(),
            title: document.title,
            value: document.value,
            closeDate: document.closeDate,
            projectId: document.project_id.toHexString(),
            userId: document.user_id.toHexString(),
            contactId: document.contact_id.toHexString(),
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
        };
    }
}
