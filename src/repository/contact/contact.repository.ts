import {Contact} from "../../domain/contact/contact.domain";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ContactRepository {
    contactRepositoryDB: Contact[];

    constructor() {
        this.contactRepositoryDB = [{
            _id: "5349b4ddd2781d08c09890f4",
            name: "John",
            organization: "google",
            email: "john@gmail.com",
            phone: "+998903470144"
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
