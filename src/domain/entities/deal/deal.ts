export enum DealStatus {
    Qualified = 1,
    ContactMade = 2,
    DemoScheduled = 3,
    ProposalMade = 4,
    NegotiationStarted = 5,
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
