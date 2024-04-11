export interface Repository<T> {
    findAll(): Promise<T[]>;

    findOne(id: string): Promise<T>;
}
