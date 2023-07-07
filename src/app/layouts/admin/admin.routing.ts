import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TimelineComponent } from 'src/app/pages/admin/feed/timeline/timeline.component';

export const AdminRoutes: Routes = [
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'timeline',
    component: TimelineComponent,
    canActivate: [AuthGuard],
  },
];
