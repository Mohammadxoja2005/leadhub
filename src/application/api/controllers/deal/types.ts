import { Contact, Deal, Lead } from "app/domain";

export type DealWithContact = Omit<Deal, "projectId" | "userId"> &
    Omit<Contact, "projectId" | "userId" | "createdAt" | "updatedAt">;

export type DealCreate = Omit<Deal, "id" | "createdAt" | "updatedAt">;

export type DealUpdate = { id: string } & Partial<
    Omit<Deal, "id" | "updatedAt" | "createdAt" | "userId" | "projectId" | "contactId">
>;
