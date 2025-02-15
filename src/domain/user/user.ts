export type User = {
    username: string;
    password: string;
    name: string;
    email: string;
    isActive: boolean;
    role: "admin" | "regular";
    projectId: string;
    oAuth: {
        googleId: string;
    };
};
