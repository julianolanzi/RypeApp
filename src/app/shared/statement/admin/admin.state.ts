import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth/auth.effects';
import { AuthState,  authReducer } from './auth/auth.reducer';

export interface AdminState {
  auth: AuthState;
}

export const AdminReducer: ActionReducerMap<AdminState> = {
  auth: authReducer
};

export const AdminEffect = [AuthEffects];
