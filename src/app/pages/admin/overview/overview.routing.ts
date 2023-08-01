import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { OverviewPlayerComponent } from "./Player/overview-player/overview-player.component";
import { OverviewTeamComponent } from "./Team/overview-team/overview-team.component";


export const OverviewRoutes: Routes = [
    {
      path: 'player/:nickname',
      component: OverviewPlayerComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'profile/:nickname',
      component: OverviewPlayerComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'team-profile',
      component: OverviewTeamComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'team-overview',
      component: OverviewTeamComponent,
      canActivate: [AuthGuard],
    },
    
  ];