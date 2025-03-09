export type User = {
    id: string;
    username: string | null;
    password: string;
    name: string;
    email: string;
    isActive: boolean;
    role: "admin" | "regular";
    projectId: string;
    oAuth: {
        googleId: string;
    };
    createdAt: string;
    updatedAt: string;
};
