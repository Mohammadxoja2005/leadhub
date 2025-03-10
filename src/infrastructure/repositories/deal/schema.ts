import { Schema, Types } from "mongoose";
import { Collections } from "app/infrastructure/schema";
import { DealHydratedDocument } from "./document";

export const DealSchema = new Schema<DealHydratedDocument>(
    {
        title: String,
        value: { type: Number, default: null },
        close_date: { type: Date, default: null },
        project_id: String,
        user_id: Types.ObjectId,
        contact_id: Types.ObjectId,
        status: Number,
        updated_at: Date,
        created_at: Date,
    },
    {
        versionKey: false,
        collection: Collections.Deal,
    },
);
