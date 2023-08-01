import { CommonModule } from '@angular/common';
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
import { SharedModule } from '../../../shared/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UserSocialComponent } from './user-social/user-social.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUploadImageProfileComponent } from './user-upload-image-profile/user-upload-image-profile.component';
import { UserUploadCoverProfileComponent } from './user-upload-cover-profile/user-upload-cover-profile.component';
import { HeaderProfileComponent } from './header-profile/header-profile.component';


export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [UserSecurityComponent, UserSocialComponent, UserProfileComponent, UserUploadImageProfileComponent, UserUploadCoverProfileComponent, HeaderProfileComponent],
  providers: [provideNgxMask()],
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes),
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ImageCropperModule,
  ],
})
export class AccountModule {}
