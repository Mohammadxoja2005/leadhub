import { type Lead } from "../../domain";
import { Injectable, NotFoundException } from "@nestjs/common";
import { type LeadRepository } from "../../interfaces/";

@Injectable()
export class LeadRepositoryImpl implements LeadRepository {
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

    public async findAll(): Promise<Lead[]> {
        return this.leadRepositoryDB;
    }

    public async findOne(id: string): Promise<Lead> {
        const lead = this.leadRepositoryDB.find((lead: Lead) => {
            if (lead._id === id) {
                return lead;
            }
        });

        if (lead === undefined) {
            throw new NotFoundException("Lead not found");
        }

        return lead;
    }

    public async create(lead: Lead): Promise<Lead> {
        this.leadRepositoryDB.push(lead);

        return lead;
    }

    public async update(lead: Lead): Promise<Lead> {
        const leadIndex: number = this.leadRepositoryDB.findIndex((leadUpdate: Lead) => {
            if (leadUpdate._id === lead._id) {
                return leadUpdate;
            }
        });

        this.leadRepositoryDB[leadIndex] = lead;

        return this.leadRepositoryDB[leadIndex];
    }

    public async delete(id: string): Promise<Lead[]> {
        return this.leadRepositoryDB.filter((lead: Lead) => lead._id !== id);
    }
}
