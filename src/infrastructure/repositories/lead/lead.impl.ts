import { Injectable, NotFoundException } from "@nestjs/common";
import { Lead } from "../../../domain";
import { LeadRepository } from "./lead";
import { LeadDocument } from "./document";
import { ObjectId } from "mongodb";

@Injectable()
export class LeadRepositoryImpl implements LeadRepository {
    private readonly leadRepositoryDB: LeadDocument[];

    constructor() {
        this.leadRepositoryDB = [
            {
                _id: new ObjectId("5349b4ddd2781108c09890f4"),
                title: "Dan Wu lead",
                value: 700.99,
                closeDate: Date.now(),
                projectId: new ObjectId("5349b4ddd2781d08c09890f4"),
                userId: new ObjectId("5349b4ddd2781d08c09890f4"),
                contactId: new ObjectId("5349b4ddd2781d08c09890f4"),
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        ];
    }

    public async getAllByUserId(id: string): Promise<Lead[]> {
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

    public async getAllByUserIdAndProjectId(userId: string, projectId: string): Promise<Lead[]> {
        const documents = this.leadRepositoryDB.filter((lead: LeadDocument) => {
            if (
                lead.userId.toHexString() === userId &&
                lead.projectId.toHexString() === projectId
            ) {
                return lead;
            }
        });

        if (!documents) {
            throw new NotFoundException("Lead not found");
        }

        return documents.map((document) => this.documentEntity(document));
    }

    public async getById(id: string): Promise<Lead> {
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

    private documentEntity(document: LeadDocument): Lead {
        return {
            id: document._id.toHexString(),
            title: document.title,
            value: document.value,
            closeDate: document.closeDate,
            projectId: document.projectId.toHexString(),
            userId: document.userId.toHexString(),
            contactId: document.contactId.toHexString(),
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
        };
    }
}
