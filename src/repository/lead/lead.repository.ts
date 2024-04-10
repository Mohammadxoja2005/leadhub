import { Lead } from "../../domain/lead/lead.domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LeadRepository {
    leadRepositoryDB: Lead[];

    constructor() {
        this.leadRepositoryDB = [
            {
                _id: "5349b4ddd2781d08c09890f4",
                first_name: "John",
                last_name: "Doe",
                organization: "google",
                title: "lead for google",
                value: 100.0,
                phone: "+998905879038",
                email: "johndoe@gmail.com",
                date: new Date(),
            },
        ];
    }

    public findAll(): Lead[] {
        return this.leadRepositoryDB;
    }

    public findOne(id: string): Lead {
        return this.leadRepositoryDB.find((lead: Lead) => {
            if (lead._id === id) {
                return lead;
            }
        });
    }

    public create(lead: Lead): Lead {
        this.leadRepositoryDB.push(lead);

        return lead;
    }

    public update(lead: Lead): Lead {
        const leadIndex: number = this.leadRepositoryDB.findIndex((leadUpdate: Lead) => {
            if (leadUpdate._id === lead._id) {
                return leadUpdate;
            }
        });

        this.leadRepositoryDB[leadIndex] = lead;

        return this.leadRepositoryDB[leadIndex];
    }

    public delete(id: string): Lead[] {
        return this.leadRepositoryDB.filter((lead: Lead) => lead._id !== id);
    }
}
