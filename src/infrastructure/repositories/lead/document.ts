import { HydratedDocument, Types } from "mongoose";

export type LeadDocument = {
    _id: Types.ObjectId;
    title: string;
    value: number | null;
    close_date: Date | null;
    project_id: Types.ObjectId;
    user_id: Types.ObjectId;
    contact_id: Types.ObjectId;
    created_at: Date;
    updated_at: Date;
};

export type LeadCreateDocument = Omit<LeadDocument, "_id">;

export type LeadWithContactDocument = {
    name: string;
    organization: string | null;
    email: string | null;
    phone: string | null;
} & LeadDocument;

export type LeadHydratedDocument = HydratedDocument<LeadDocument>;
