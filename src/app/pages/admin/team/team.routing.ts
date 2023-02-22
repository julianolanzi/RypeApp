
import { Routes } from '@angular/router';

import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { TeamSetupComponent } from './team-setup/team-setup.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamSearchComponent } from './team-search/team-search.component';

import { AuthGuard } from 'src/app/guards/auth.guard';

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
];