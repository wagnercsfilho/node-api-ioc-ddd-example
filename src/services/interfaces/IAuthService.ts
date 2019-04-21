import { SignUpRequest } from "../../arguments/SignUpRequest";
import { AuthResponse } from "../../arguments/AuthResponse";
import { SignInRequest } from "../../arguments/SignInRequest";
import { IUserDocument } from "../../models/User";

export interface IAuthService {
  getUserByToken: (token: string) => Promise<IUserDocument | null>;
  signUp: (request: SignUpRequest) => Promise<AuthResponse>;
  signIn: (request: SignInRequest) => Promise<AuthResponse>;
  createToken: (user: IUserDocument) => string;
}
