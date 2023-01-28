
import { Routes } from "@angular/router";

import { AuthComponent } from './../../pages/web/auth/auth.component';
import { HomeComponent } from './../../pages/web/home/home.component';

export const WebRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },

]