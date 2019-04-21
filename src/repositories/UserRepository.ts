import { RepositoryBase } from "./base/RepositoryBase";
import { User, IUserDocument } from "../models/User";
import { IRepository } from "./interfaces/IRepository";
import { injectable } from "inversify";

@injectable()
export class UserRepository extends RepositoryBase<IUserDocument>
  implements IRepository<IUserDocument> {
  constructor() {
    super(User);
  }
}
