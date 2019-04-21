import { IRepository } from "./IRepository";
import { IUserDocument } from "../../models/User";
export interface IUserRepository extends IRepository<IUserDocument> {}
