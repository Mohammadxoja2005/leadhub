export type Contact = {
    id: string;
    name: string;
    organization: string | null;
    email: string | null;
    phone: string | null;
    projectId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
