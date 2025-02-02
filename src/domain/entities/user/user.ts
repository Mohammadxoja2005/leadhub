export type User = {
    username: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    role: "admin" | "regular";
    projectId: string;
};
