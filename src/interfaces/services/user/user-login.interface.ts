import { RequestCollection } from "../../collection-json-templates/request-collection.type";
import { ResponseCollection } from "../../collection-json-templates/response-collection.type";

export type UserLoginRequest = RequestCollection<{
    usernameOrEmail: string;
    password: string;
}>;

export type UserLoginResponse = ResponseCollection<{
    _id: string;
    name: string;
    phone: string;
    email: string;
    role: "admin" | "regular";
}>;

export interface UserLogin {
    loginUser: (user: UserLoginRequest) => Promise<UserLoginResponse | false>;
}
