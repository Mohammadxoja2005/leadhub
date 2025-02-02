export enum DealStatus {
    qualified = "Qualified",
    contact_made = "Contact_Made",
    demo_scheduled = "Demo_Scheduled",
    proposal_made = "Proposal_Made",
    negotiation_started = "Negotiations_Started",
}

export type Deal = {
    _id?: string;
    name: string;
    phone: string;
    email: string;
    company: string;
    value: number;
    date: Date;
    status: DealStatus;
    project_id: string;
    user_id: string;
};
