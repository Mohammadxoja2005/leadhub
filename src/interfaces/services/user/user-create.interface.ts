export interface UserCreate<T> {
    createUser: (user: T) => Promise<any>;
}
