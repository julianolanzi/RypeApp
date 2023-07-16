import { Routes } from "@angular/router";
import { OverviewPlayerComponent } from "./overview-player/overview-player.component";
import { AuthGuard } from "src/app/guards/auth.guard";


export const OverviewPlayerRoutes: Routes = [
    {
      path: 'player/:nickname',
      component: OverviewPlayerComponent,
      canActivate: [AuthGuard],
    },
  ];