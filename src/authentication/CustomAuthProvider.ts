import express from "express";
import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { AuthService } from "../services/AuthService";
import { Principal } from "./Principal";
import TYPES from "../types";

@injectable()
export class CustomAuthProvider implements interfaces.AuthProvider {
  constructor(
    @inject(TYPES.IAuthService) private readonly _authService: AuthService
  ) {}

  public async getUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<interfaces.Principal> {
    const token = <string>req.headers["authorization"];
    if (!token) return new Principal(null);
    const user = await this._authService.getUserByToken(token);
    return new Principal(user);
  }
}
