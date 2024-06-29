import { type UserCreate } from "./user-create.interface";
import { type UserDelete } from "./user-delete.interface";
import { type UserUpdate } from "./user-update.interface";
import { type UserLogin } from "./user-login.interface";

export interface UserService extends UserCreate, UserDelete, UserUpdate, UserLogin {}
