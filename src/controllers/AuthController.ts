import { controller, httpPost } from "inversify-express-utils";
import { Request } from "express";
import { inject } from "inversify";
import TYPES from "../types";
import { ControllerBase } from "./base/ConstrollerBase";
import { AuthService } from "../services/AuthService";
import { AuthResponse } from "../arguments/AuthResponse";
import { SignInRequest } from "../arguments/SignInRequest";
import { SignUpRequest } from "../arguments/SignUpRequest";

@controller("/auth")
class AuthController extends ControllerBase {
  constructor(
    @inject(TYPES.IAuthService) private readonly _authService: AuthService
  ) {
    super();
  }

  @httpPost("/signup")
  public async signUp(request: Request): Promise<AuthResponse> {
    const signInRequest = new SignUpRequest(
      request.body.email,
      request.body.password
    );
    const user = await this._authService.signUp(signInRequest);
    return user;
  }

  @httpPost("/signin")
  public async signIn(request: Request): Promise<AuthResponse> {
    const token = this.httpContext.request.headers["authorization"];
    if (!token) throw new Error("Token not provider");
    const signInRequest = new SignInRequest(
      request.body.email,
      request.body.password,
      token
    );
    const users = await this._authService.signIn(signInRequest);
    return users;
  }
}

export default AuthController;
