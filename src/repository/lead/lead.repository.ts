import {Lead} from "../../domain/lead/lead.domain";
import {Injectable} from "@nestjs/common";

@Injectable()
export class LeadRepository {
    leadRepositoryDB: Lead[];

    constructor() {
        this.leadRepositoryDB = [{
            _id: "5349b4ddd2781d08c09890f4",
            first_name: "John",
            last_name: "Doe",
            organization: "google",
            title: "lead for google",
            value: 100.00,
            phone: "+998905879038",
            email: "johndoe@gmail.com",
            date: new Date()
        }]
    }

    public findAll() {

    }

    public findOne() {

    }

    public update() {

    }

    public delete() {

    }
}