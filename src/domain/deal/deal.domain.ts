export enum DealStatus {
    qualified = "Qualified",
    contact_made = "Contact_Made",
    demo_scheduled = "Demo_Scheduled",
    proposal_made = "Proposal_Made",
    negotiation_started = "Negotiations_Started",
}

export interface Deal {
    _id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    organization: string;
    value: number;
    date: Date;
    status: DealStatus;
}
