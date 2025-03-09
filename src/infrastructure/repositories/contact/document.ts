import { HydratedDocument, Types } from "mongoose";

export type ContactDocument = {
    _id: Types.ObjectId;
    name: string;
    organization: string | null;
    email: string | null;
    phone: string | null;
    project_id: string;
    user_id: Types.ObjectId;
    created_at: Date;
    updated_at: Date;
};

export type ContactCreateDocument = Omit<ContactDocument, "_id">;

export type ContactHydratedDocument = HydratedDocument<ContactDocument>;
