import { UserLogin } from 'src/app/models/auth/user-login';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';

export type User = Omit<UserLogin, 'password'>;

export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthSuccess = {
  token: string;
  user: UserLoginSuccess;
};

export type AuthFailure = {
  errorMessage: string;
};
