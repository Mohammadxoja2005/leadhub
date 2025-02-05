import { Document, HydratedDocument, Types } from "mongoose";

export class LeadDocument extends Document {
    public _id: Types.ObjectId;
    public title: string;
    public value: number | null;
    public closeDate: number | null;
    public project_id: Types.ObjectId;
    public user_id: Types.ObjectId;
    public contact_id: Types.ObjectId;
    public createdAt: number;
    public updatedAt: number;
}

export type LeadHydratedDocument = HydratedDocument<LeadDocument>;
