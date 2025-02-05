import { HydratedDocument, Types } from "mongoose";

export type LeadDocument = {
    _id: Types.ObjectId;
    title: string;
    value: number | null;
    closeDate: number | null;
    projectId: string;
    userId: string;
    contactId: string;
    createdAt: number;
    updatedAt: number;
};

export type LeadHydratedDocument = HydratedDocument<LeadDocument>;
