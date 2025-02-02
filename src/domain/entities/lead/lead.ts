export type Lead = {
    person: string;
    company: string;
    title: string;
    phone: string | null;
    email: string | null;
    value: number | null;
    closeDate: number | null;
    projectId: string;
    userId: string;
    createdAt: number;
    updatedAt: number;
};
