import { HydratedDocument, Types } from "mongoose";

export class LeadDocument {
    public _id: Types.ObjectId;
    public title: string;
    public value: number | null;
    public close_date: Date | null;
    public project_id: Types.ObjectId;
    public user_id: Types.ObjectId;
    public contact_id: Types.ObjectId;
    public created_at: Date;
    public updated_at: Date;
}

export class LeadWithContactDocument extends LeadDocument {
    public name: string;
    public organization: string | null;
    public email: string | null;
    public phone: string | null;
}

export type LeadHydratedDocument = HydratedDocument<LeadDocument>;
