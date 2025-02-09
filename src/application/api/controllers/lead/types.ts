import { Contact, Lead } from "app/domain";

export type LeadWithContact = Omit<Lead, "projectId" | "userId"> &
    Omit<Contact, "projectId" | "userId" | "createdAt" | "updatedAt">;

export type LeadUpdate = { id: string } & Partial<
    Omit<Lead, "id" | "updatedAt" | "createdAt" | "userId" | "projectId" | "contactId">
>;

export type LeadCreate = Omit<Lead, "id" | "createdAt" | "updatedAt">;
