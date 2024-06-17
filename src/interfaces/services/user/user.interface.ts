import { type UserCreate } from "./user-create.interface";
import { type UserDelete } from "./user-delete.interface";
import { type UserUpdate } from "./user-update.interface";

import { type UserRegister } from "../../../common/schema/user/user-register.schema";

export interface UserService extends UserCreate<UserRegister>, UserDelete, UserUpdate {}
