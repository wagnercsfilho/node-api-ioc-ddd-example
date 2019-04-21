import "reflect-metadata";
import express from "express";
import cors from "cors";
import { InversifyExpressServer, getRouteInfo } from "inversify-express-utils";
import { Container } from "inversify";
import mongoose from "mongoose";
import * as prettyjson from "prettyjson";

import TYPES from "./types";

mongoose.Promise = Promise;

import { IAuthService } from "./services/interfaces/IAuthService";
import { AuthService } from "./services/AuthService";
import { IUserRepository } from "./repositories/interfaces/IUserRepository";
import { UserRepository } from "./repositories/UserRepository";
import "./controllers/UserController";
import "./controllers/AuthController";
import { CustomAuthProvider } from "./authentication/CustomAuthProvider";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

class App {
  private container: Container;
  private server: InversifyExpressServer;

  public constructor() {
    this.container = this.configureServices();
    this.server = this.buildServer();
    this.server.setConfig(this.middlewares);
    this.server.setErrorConfig(this.onApplicationError);
    this.database();
  }

  public build() {
    const server = this.server.build();
    const routeInfo = getRouteInfo(this.container);
    console.log(prettyjson.render({ routes: routeInfo }));
    return server;
  }

  private configureServices() {
    const container = new Container();
    container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
    container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
    container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
    return container;
  }

  private buildServer() {
    return new InversifyExpressServer(
      this.container,
      null,
      {
        rootPath: "/api/v1"
      },
      null,
      CustomAuthProvider
    );
  }

  private middlewares(app: express.Application): void {
    app.use(express.json());
    app.use(cors());
  }

  private database(): void {
    mongoose.connect(`mongodb://localhost:27017/tsexample`, {
      useNewUrlParser: true
    });
  }

  private onApplicationError(app: express.Application) {
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
  }
}

export default new App().build();
