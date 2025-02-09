import { Schema, Types } from "mongoose";
import { LeadHydratedDocument } from "./document";
import { Collections } from "../../schema";

export const LeadSchema = new Schema<LeadHydratedDocument>(
    {
        title: String,
        value: { type: Number, default: null },
        close_date: { type: Date, default: null },
        project_id: Types.ObjectId,
        user_id: Types.ObjectId,
        contact_id: Types.ObjectId,
        updated_at: Date,
        created_at: Date,
    },
    {
        versionKey: false,
        collection: Collections.Lead,
    },
);
