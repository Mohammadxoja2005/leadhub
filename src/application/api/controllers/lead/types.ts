import { Contact, Lead } from "../../../../domain";

export type LeadWithContact = Lead &
    Omit<Contact, "projectId" | "userId" | "createdAt" | "updatedAt">;

export type LeadUpdate = { id: string } & Partial<Omit<Lead, "id" | "updatedAt" | "createdAt">>;

export type LeadCreate = Omit<Lead, "createdAt" | "updatedAt">;
