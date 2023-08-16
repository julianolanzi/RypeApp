import { Routes } from "@angular/router";
import { AllEventsComponent } from "./all-events/all-events.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { MyEventsComponent } from "./my-events/my-events.component";

export const EventsRoutes: Routes = [
    {
        path: 'all-events',
        component: AllEventsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'my-events',
        component: MyEventsComponent,
        canActivate: [AuthGuard],
    },
]