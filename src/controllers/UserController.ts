import { controller, httpGet } from "inversify-express-utils";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { IUserDocument } from "../models/User";
import { inject } from "inversify";
import TYPES from "../types";
import { ControllerBase } from "./base/ConstrollerBase";

@controller("/users")
class UserController extends ControllerBase {
  constructor(
    @inject(TYPES.IUserRepository) private _repository: IUserRepository
  ) {
    super();
  }

  @httpGet("/", TYPES.AuthMiddleware)
  public async index(): Promise<IUserDocument[]> {
    console.log(this.httpContext.user.details);
    const users = await this._repository.find();
    return users;
  }
}

export default UserController;
