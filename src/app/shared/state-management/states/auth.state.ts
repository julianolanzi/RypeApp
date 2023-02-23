import { UserLoginSuccess } from "src/app/models/auth/user-login-success";

export interface AuthState {
    auth: UserLoginSuccess;
    authError?: Error;
}