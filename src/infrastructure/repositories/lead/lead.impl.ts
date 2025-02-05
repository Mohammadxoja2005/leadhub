import { Injectable, NotFoundException } from "@nestjs/common";
import { Lead } from "../../../domain";
import { LeadRepository } from "./lead";
import { LeadDocument } from "./document";
import { ObjectId } from "mongodb";
import { LeadWithContact } from "../../../application/services/lead/types";

@Injectable()
export class LeadRepositoryImpl implements LeadRepository {
    private readonly leadRepositoryDB: LeadDocument[];
    private readonly contactRepositoryDB: any[];

    // TODO need to return data of contacts in leads
    constructor() {
        this.leadRepositoryDB = [
            {
                _id: new ObjectId("5349b4ddd2781108c09890f4"),
                title: "Dan Wu lead",
                value: 700.99,
                closeDate: Date.now(),
                projectId: "5349b4ddd2781d08c09890f4",
                userId: "5349b4ddd2781d08c09890f4",
                contactId: "5349b4ddd2781d08c09890f4",
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        ];

        this.contactRepositoryDB = [
            {
                _id: "5349b4ddd2781d08c09890f4",
                name: "Dan Wu",
                organization: "Dan Wu corp",
                email: "danwu@gmail.com",
                phone: "+998903470144",
                projectId: "5349b4ddd2781d08c09890f4",
                userId: "5349b4ddd2781d08c09690f4",
            },
        ];
    }

    public async getAllByUserId(id: string): Promise<LeadWithContact[]> {
        const documents = this.leadRepositoryDB.filter((document: LeadDocument) => {
            if (document._id.toHexString() === id) {
                return document;
            }
        });

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
            if (lead.userId === userId && lead.projectId === projectId) {
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
            projectId: document.projectId,
            userId: document.userId,
            contactId: document.contactId,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
        };
    }
}
