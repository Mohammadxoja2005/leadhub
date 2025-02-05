import { Schema } from "mongoose";

const LeadSchema = new Schema(
    {
        title: { type: String, required: true },
        value: { type: Number, default: null },
        closeDate: { type: Number, default: null },
        projectId: { type: String, required: true },
        userId: { type: String, required: true },
        contactId: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },
);
export { LeadSchema };
