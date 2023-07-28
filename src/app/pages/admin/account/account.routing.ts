import { UserSocialComponent } from './user-social/user-social.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSecurityComponent } from './user-security/user-security.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';

import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserUploadImageProfileComponent } from './user-upload-image-profile/user-upload-image-profile.component';
import { CoverImageComponent } from 'src/app/shared/components/cover-image/cover-image.component';
import { UserUploadCoverProfileComponent } from './user-upload-cover-profile/user-upload-cover-profile.component';


export const AccountRoutes: Routes = [
  {
    path: 'overview',
    component: UserOverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'security',
    component: UserSecurityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'social',
    component: UserSocialComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'upload-image-user',
    component: UserUploadImageProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'upload-cover-user',
    component: UserUploadCoverProfileComponent,
    canActivate: [AuthGuard],
  },
];
