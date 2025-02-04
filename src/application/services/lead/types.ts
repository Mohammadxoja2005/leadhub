import { Contact, Lead } from "../../../domain";

export type LeadWithContact = Lead & Omit<Contact, "projectId" | "userId">;
