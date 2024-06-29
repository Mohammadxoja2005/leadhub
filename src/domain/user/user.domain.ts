export interface User {
    _id: string;
    username: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    role: "admin" | "regular";
}
