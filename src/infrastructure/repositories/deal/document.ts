import { DealStatus } from "app/domain";
import { HydratedDocument, Types } from "mongoose";

export type DealDocument = {
    id: string;
    title: string;
    project_id: Types.ObjectId;
    user_id: Types.ObjectId;
    value: number | null;
    close_date: string | null;
    contact_id: Types.ObjectId;
    status: DealStatus;
    created_at: string;
    updated_at: string;
};

export type DealHydratedDocument = HydratedDocument<DealDocument>;
