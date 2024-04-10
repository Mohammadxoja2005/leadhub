import {Deal, DealStatus} from "../../domain/deal/deal.domain";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DealRepository {
    dealRepositoryDB: Deal[];

    constructor() {
        this.dealRepositoryDB = [{
            _id: "5349b4ddd2781d08c09890f4",
            first_name: "John",
            last_name: "Doe",
            phone: "+998905879038",
            email: "johndoe@gmail.com",
            organization: "google",
            value: 100.00,
            date: new Date(),
            status: DealStatus.qualified
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