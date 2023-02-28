import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';

export interface AuthState {
  user: UserLoginSuccess;
  authError?: Error;
  isAuthenticated: boolean;
}
