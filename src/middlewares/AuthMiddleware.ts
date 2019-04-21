import express from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import TYPES from "../types";

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  public async handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(await this.httpContext.user.isAuthenticated());
    if (await this.httpContext.user.isAuthenticated()) {
      next();
    } else {
      res.sendStatus(401);
    }
  }
}
