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

import { AccountRoutes } from './account.routing';

import { UserSecurityComponent } from './user-security/user-security.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { SharedModule } from '../../../shared/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UserSocialComponent } from './user-social/user-social.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [UserSecurityComponent, UserOverviewComponent, UserSocialComponent, UserProfileComponent],
  providers: [provideNgxMask()],
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes),
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ImageCropperModule
  ],
})
export class AccountModule {}
