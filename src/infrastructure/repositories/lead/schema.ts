import { Schema, Types } from "mongoose";
import { LeadHydratedDocument } from "./document";
import { Collections } from "../../schema";

export const LeadSchema = new Schema<LeadHydratedDocument>(
    {
        title: String,
        value: { type: Number, default: null },
        closeDate: { type: Number, default: null },
        project_id: Types.ObjectId,
        user_id: Types.ObjectId,
        contact_id: Types.ObjectId,
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
        collection: Collections.Lead,
    },
);
