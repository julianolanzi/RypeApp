import { TeamSettingsComponent } from './team-settings/team-settings.component';

import { Routes } from '@angular/router';

import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { TeamSetupComponent } from './team-setup/team-setup.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamSearchComponent } from './team-search/team-search.component';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { TeamUpdateMemberComponent } from './team-update-member/team-update-member.component';
import { TeamUpdateAdminComponent } from './team-update-admin/team-update-admin.component';
import { TeamUserSearchComponent } from './team-user-search/team-user-search.component';
import { UpdateCoverTeamComponent } from './update-cover-team/update-cover-team.component';
import { UpdateImgTeamComponent } from './update-img-team/update-img-team.component';

export const TeamRoutes: Routes = [
  {
    path: 'team-overview',
    component: TeamOverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'team-setup',
    component: TeamSetupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'team-search',
    component: TeamSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'team-create',
    component: TeamCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'team-settings',
    component: TeamSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'team-members',
    component: TeamUpdateMemberComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'team-admins',
    component: TeamUpdateAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'team-search-user',
    component: TeamUserSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-image-team',
    component: UpdateImgTeamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-cover-team',
    component: UpdateCoverTeamComponent,
    canActivate: [AuthGuard],
  },
];
