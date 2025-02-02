export enum DealStatus {
    qualified = 1,
    contactMade = 2,
    demoScheduled = 3,
    proposalMade = 4,
    negotiationStarted = 5,
}

export type Deal = {
    title: string;
    projectId: string;
    userId: string;
    createdAt: number;
    updatedAt: number;
    value: number | null;
    closeDate: number | null;
    contactId: string;
    status: DealStatus;
};
