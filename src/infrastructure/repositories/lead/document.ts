import { ObjectId } from "mongodb";

export type LeadDocument = {
    _id: ObjectId;
    title: string;
    value: number | null;
    closeDate: number | null;
    projectId: ObjectId;
    userId: ObjectId;
    contactId: ObjectId;
    createdAt: number;
    updatedAt: number;
};
