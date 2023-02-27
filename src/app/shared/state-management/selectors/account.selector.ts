import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from '../states/account.state';


export const AccountGlobalSelector = createFeatureSelector<AccountState>('account');

const _account = (state: AccountState) => state.account;
const _isChange = (state: AccountState) => state.ischange;

export const AccountSelector = createSelector(AccountGlobalSelector, _account);
export const isChange = createSelector(AccountGlobalSelector, _isChange);
