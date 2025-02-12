export type User = {
    username: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    active: boolean;
    role: "admin" | "regular";
    projectId: string;
};
