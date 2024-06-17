export interface UserDelete {
    deleteUser: (id: string) => Promise<any[]>;
}
