import { UserLoginSuccess } from 'src/app/models/auth/login/user-login-success';

export interface AuthState {
  user: UserLoginSuccess;
  authError?: Error;
  isAuthenticated: boolean;
}
