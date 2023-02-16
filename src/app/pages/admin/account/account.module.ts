import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  IConfig,
  NgxMaskDirective,
  NgxMaskPipe,
  provideNgxMask,
} from 'ngx-mask';

import { SharedModule } from 'src/app/shared/shared.module';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { AccountRoutes } from './account.routing';

import { UserSecurityComponent } from './user-security/user-security.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [UserSecurityComponent, UserOverviewComponent],

  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes),
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [LocalStorageUtils, provideNgxMask()],
})
export class AccountModule {}
