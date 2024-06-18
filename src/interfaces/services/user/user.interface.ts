import { type UserCreate } from "./user-create.interface";
import { type UserDelete } from "./user-delete.interface";
import { type UserUpdate } from "./user-update.interface";

export interface UserService extends UserCreate, UserDelete, UserUpdate {}
