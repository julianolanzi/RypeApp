import { TeamSettingsComponent } from './../../pages/admin/team/team-settings/team-settings.component';
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DashboardComponent } from './../../pages/admin/dashboard/dashboard.component';

export const AdminRoutes: Routes = [
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
