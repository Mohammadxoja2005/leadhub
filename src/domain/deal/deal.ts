export enum DealStatus {
    Qualified = 1,
    ContactMade = 2,
    DemoScheduled = 3,
    ProposalMade = 4,
    NegotiationStarted = 5,
}

export type Deal = {
    id: string;
    title: string;
    projectId: string;
    userId: string;
    value: number | null;
    closeDate: string | null;
    createdAt: string;
    updatedAt: string;
    contactId: string;
    status: DealStatus;
};
