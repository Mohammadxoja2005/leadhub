import { Contact } from "../../domain/contact/contact.domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ContactRepository {
    contactRepositoryDB: Contact[];

    constructor() {
        this.contactRepositoryDB = [
            {
                _id: "5349b4ddd2781d08c09890f4",
                name: "John",
                organization: "google",
                email: "john@gmail.com",
                phone: "+998903470144",
            },
        ];
    }

    public findAll(): Contact[] {
        return this.contactRepositoryDB;
    }

    public create(contact: Contact): Contact {
        this.contactRepositoryDB.push(contact);

        return contact;
    }

    public findOne(id: string): Contact {
        return this.contactRepositoryDB.find((contact: Contact) => {
            if (contact._id === id) {
                return contact;
            }
        });
    }

    public update(contact: Contact): Contact {
        const contactIndex: number = this.contactRepositoryDB.findIndex(
            (contactUpdate: Contact) => {
                if (contactUpdate._id === contact._id) {
                    return contactUpdate;
                }
            },
        );

        this.contactRepositoryDB[contactIndex] = contact;

        return this.contactRepositoryDB[contactIndex];
    }

    public delete(id: string): Contact[] {
        return this.contactRepositoryDB.filter((contact: Contact) => contact._id !== id);
    }
}
