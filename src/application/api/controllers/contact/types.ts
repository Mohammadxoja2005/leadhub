import { Contact } from "app/domain";

export type ContactCreate = Omit<Contact, "id" | "createdAt" | "updatedAt">;

export type ContactUpdate = { id: string } & Partial<
    Omit<Contact, "id" | "createdAt" | "updatedAt" | "userId" | "projectId">
>;
