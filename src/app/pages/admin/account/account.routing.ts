import { Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserSecurityComponent } from './user-security/user-security.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';

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
];
