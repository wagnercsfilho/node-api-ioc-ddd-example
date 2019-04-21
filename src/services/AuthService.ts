import { injectable, inject } from "inversify";
import * as jwt from "jsonwebtoken";
import { IAuthService } from "./interfaces/IAuthService";
import { SignUpRequest } from "../arguments/SignUpRequest";
import TYPES from "../types";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { config } from "../config";
import { IUserDocument } from "../models/User";
import { AuthResponse } from "../arguments/AuthResponse";

const user = { name: "Wagner" };

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  public async signUp(request: SignUpRequest) {
    const email = request.email;
    const password = request.password;

    const user = await this._userRepository.findOne({ email });
    if (user) throw new Error("User already exists!");

    let newUser = <IUserDocument>{
      email,
      password
    };
    newUser = await this._userRepository.create(newUser);

    const token = this.createToken(newUser);

    const response = new AuthResponse(token);
    return response;
  }

  public async signIn(request: SignUpRequest) {
    const email = request.email;
    const password = request.password;

    const user = await this._userRepository.findOne({ email });
    if (!user) throw new Error("User not found!");

    if (!user.comparePassword(password)) {
      throw new Error("User not found!");
    }

    const token = this.createToken(user);

    const response = new AuthResponse(token);
    return response;
  }

  public async getUserByToken(token: string) {
    const decoded = <IUserDocument>jwt.verify(token, config.SECRET);
    return await this._userRepository.findById(decoded._id);
  }

  public createToken(user: IUserDocument) {
    return jwt.sign({ _id: user._id, email: user.email }, config.SECRET);
  }
}
