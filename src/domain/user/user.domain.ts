export interface User {
    _id: string;
    name: string;
    phone: string;
    email: string;
    role: "admin" | "regular";
}
