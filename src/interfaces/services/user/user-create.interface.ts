import { RequestCollection } from "../../collection-json-templates/request-collection.type";
import { ResponseCollection } from "../../collection-json-templates/response-collection.type";

export type UserRegisterRequest = RequestCollection<{
    name: string;
    phone: string;
    email: string;
    role: "admin" | "regular";
}>;

export type UserRegisterResponse = ResponseCollection<{
    _id: string;
    name: string;
    phone: string;
    email: string;
    role: "admin" | "regular";
}>;

export interface UserCreate {
    createUser: (user: UserRegisterRequest) => Promise<UserRegisterResponse>;
}
