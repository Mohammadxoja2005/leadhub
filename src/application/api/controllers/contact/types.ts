import { Contact } from "app/domain";

export type ContactCreate = Omit<Contact, "id" | "createdAt" | "updatedAt">;

export type ContactBase = Omit<Contact, "projectId" | "userId">;

export type ContactUpdate = { id: string } & Partial<
    Omit<Contact, "id" | "createdAt" | "updatedAt" | "userId" | "projectId">
>;
