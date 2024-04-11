import { User } from "../../domain";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../interfaces/";

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
        return this.userRepositoryDB.find((user: User) => {
            if (user._id === id) {
                return user;
            }
        });
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
