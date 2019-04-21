import { interfaces } from "inversify-express-utils";
import { IUserDocument } from "../models/User";

export class Principal implements interfaces.Principal {
  public details: any;
  public constructor(details: IUserDocument | null) {
    this.details = details;
  }
  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.details);
  }
  public isResourceOwner(resourceId: any): Promise<boolean> {
    return Promise.resolve(resourceId === 1111);
  }
  public isInRole(role: string): Promise<boolean> {
    return Promise.resolve(role === "admin");
  }
}
