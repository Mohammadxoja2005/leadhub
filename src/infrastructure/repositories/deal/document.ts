import { DealStatus } from "app/domain";
import { HydratedDocument, Types } from "mongoose";

export type DealDocument = {
    _id: Types.ObjectId;
    title: string;
    project_id: string;
    user_id: Types.ObjectId;
    value: number | null;
    close_date: Date | null;
    contact_id: Types.ObjectId;
    status: DealStatus;
    created_at: Date;
    updated_at: Date;
};

export type DealCreateDocument = Omit<DealDocument, "_id">;

export type DealWithContactDocument = {
    name: string;
    organization: string | null;
    email: string | null;
    phone: string | null;
} & DealDocument;

export type DealHydratedDocument = HydratedDocument<DealDocument>;
