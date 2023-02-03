import { Routes } from '@angular/router';

import { SingUpComponent } from './../../pages/web/sing-up/sing-up.component';
import { ContactComponent } from './../../pages/web/contact/contact.component';
import { TraningsComponent } from './../../pages/web/tranings/tranings.component';
import { EventsComponent } from './../../pages/web/events/events.component';
import { AboutComponent } from './../../pages/web/about/about.component';
import { AuthComponent } from './../../pages/web/auth/auth.component';
import { HomeComponent } from './../../pages/web/home/home.component';
import { RecoveryPasswordComponent } from './../../pages/web/recovery-password/recovery-password.component';
import { ResetPasswordComponent } from './../../pages/web/reset-password/reset-password.component';
import { TermsComponent } from './../../pages/web/terms/terms.component';

export const WebRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'sing-up', component: SingUpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent },
  { path: 'trenings', component: TraningsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'recovery-password', component: RecoveryPasswordComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
];
