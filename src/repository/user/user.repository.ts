import { User } from "../../domain/user/user.domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    userRepositoryDB: User[];

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

    public findAll(): User[] {
        return this.userRepositoryDB;
    }

    public findOne(id: string): User {
        return this.userRepositoryDB.find((user: User) => {
            if (user._id === id) {
                return user;
            }
        });
    }

    public create(user: User): User {
        this.userRepositoryDB.push(user);

        return user;
    }

    public update(user: User): User {
        const userIndex: number = this.userRepositoryDB.findIndex((user: User) => {
            if (user._id === user._id) {
                return user;
            }
        });

        this.userRepositoryDB[userIndex] = user;

        return this.userRepositoryDB[userIndex];
    }

    public delete(id: string): User[] {
        return this.userRepositoryDB.filter((user: User) => user._id !== id);
    }
}
