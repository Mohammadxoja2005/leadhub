import { type User } from "../../domain";
import { Injectable, NotFoundException } from "@nestjs/common";
import { type UserRepository } from "../../interfaces/";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    private readonly userRepositoryDB: User[];

    constructor() {
        this.userRepositoryDB = [
            {
                _id: "5349b4ddd2781d08c09890f4",
                name: "Muhammadxoja",
                phone: "+998903580505",
                email: "muhammadxojaofficial@gmail.com",
            },
        ];
    }

    public async findAll(): Promise<User[]> {
        return this.userRepositoryDB;
    }

    public async findOne(id: string): Promise<User> {
        const user = this.userRepositoryDB.find((user: User) => {
            if (user._id === id) {
                return user;
            }
        });

        if (user === undefined) {
            throw new NotFoundException("User does not exist");
        }

        return user;
    }

    public async create(user: User): Promise<User> {
        this.userRepositoryDB.push(user);

        return user;
    }

    public async update(user: User): Promise<User> {
        const userIndex: number = this.userRepositoryDB.findIndex((userUpdate: User) => {
            if (userUpdate._id === user._id) {
                return userUpdate;
            }
        });

        this.userRepositoryDB[userIndex] = user;

        return this.userRepositoryDB[userIndex];
    }

    public async delete(id: string): Promise<User[]> {
        return this.userRepositoryDB.filter((user: User) => user._id !== id);
    }
}
