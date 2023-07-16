import { AuthGuard } from "src/app/guards/auth.guard";
import { TimelineComponent } from "./timeline/timeline.component";
import { Routes } from "@angular/router";
import { FeedPageComponent } from "./feed-page/feed-page.component";

export const FeedRoutes: Routes = [
    {
      path: 'feed',
      component: FeedPageComponent,
      canActivate: [AuthGuard],
    },
  ];