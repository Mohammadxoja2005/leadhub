import { Schema, Types } from "mongoose";
import { Collections } from "app/infrastructure/schema";
import { UserHydratedDocument } from "app/infrastructure/repositories/user/document";

export const UserSchema = new Schema<UserHydratedDocument>(
    {
        username: { type: String, default: null },
        password: String,
        name: String,
        email: String,
        is_active: Boolean,
        role: { type: String, enum: ["admin", "regular"], default: "regular" },
        o_auth: {
            google_id: String,
        },
        project_id: Types.ObjectId,
        updated_at: Date,
        created_at: Date,
    },
    {
        versionKey: false,
        collection: Collections.User,
    },
);
