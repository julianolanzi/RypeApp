import { Routes } from "@angular/router";
import { OverviewPlayerComponent } from "./overview-player/overview-player.component";
import { AuthGuard } from "src/app/guards/auth.guard";


export const OverviewPlayerRoutes: Routes = [
    {
      path: 'player',
      component: OverviewPlayerComponent,
      canActivate: [AuthGuard],
    },
  ];