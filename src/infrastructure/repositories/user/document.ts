import { HydratedDocument, Types } from "mongoose";

export type UserDocument = {
    _id: Types.ObjectId;
    username: string | null;
    password: string | null;
    name: string | null;
    email: string | null;
    is_active: boolean;
    role: "admin" | "regular";
    project_id: string;
    o_auth: {
        google_id: string;
    };
    created_at: Date;
    updated_at: Date;
};

export type UserCreateDocument = Omit<UserDocument, "_id">;

export type UserHydratedDocument = HydratedDocument<UserDocument>;
