export type User = {
    id: string;
    username: string | null;
    password: string | null;
    name: string | null;
    email: string | null;
    isActive: boolean;
    role: "admin" | "regular";
    projectId: string;
    oAuth: {
        googleId: string;
    };
    createdAt: string;
    updatedAt: string;
};
