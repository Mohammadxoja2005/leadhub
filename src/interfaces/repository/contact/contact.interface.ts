import { Repository } from "../index.interface";
import { Contact } from "../../../domain";

export interface ContactRepository extends Repository<Contact> {
    create(contact: Contact): Promise<Contact>;

    update(contact: Contact): Promise<Contact>;

    delete(id: string): Promise<Contact[]>;
}
