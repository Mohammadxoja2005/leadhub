import { Schema, Types } from "mongoose";
import { Collections } from "app/infrastructure/schema";
import { ContactHydratedDocument } from "./document";

export const ContactSchema = new Schema<ContactHydratedDocument>(
    {
        name: String,
        organization: { type: String, default: null },
        email: { type: String, default: null },
        phone: { type: String, default: null },
        project_id: Types.ObjectId,
        user_id: Types.ObjectId,
        created_at: Date,
        updated_at: Date,
    },
    {
        versionKey: false,
        collection: Collections.Contact,
    },
);
