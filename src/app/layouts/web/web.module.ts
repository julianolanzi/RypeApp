import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { WebRoutes } from './web.routing';

import { AuthComponent } from './../../pages/web/auth/auth.component';
import { HomeComponent } from './../../pages/web/home/home.component';
import { SingUpComponent } from 'src/app/pages/web/sing-up/sing-up.component';
import { AboutComponent } from 'src/app/pages/web/about/about.component';
import { EventsComponent } from 'src/app/pages/web/events/events.component';
import { TraningsComponent } from 'src/app/pages/web/tranings/tranings.component';
import { BuildingComponent } from 'src/app/pages/web/building/building.component';
import { AuthService } from 'src/app/services/auth.service';
import { ContactComponent } from './../../pages/web/contact/contact.component';
import { RecoveryPasswordComponent } from 'src/app/pages/web/recovery-password/recovery-password.component';
import { TermsComponent } from 'src/app/pages/web/terms/terms.component';
import { ResetPasswordComponent } from 'src/app/pages/web/reset-password/reset-password.component';
import { SecurityService } from 'src/app/services/security.service';

@NgModule({
  declarations: [
    HomeComponent,
    AuthComponent,
    SingUpComponent,
    AboutComponent,
    EventsComponent,
    TraningsComponent,
    ContactComponent,
    BuildingComponent,
    RecoveryPasswordComponent,
    TermsComponent,
    ResetPasswordComponent,
  ],
  providers: [AuthService, SecurityService],
  imports: [
    CommonModule,
    RouterModule.forChild(WebRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class WebModule {}

function provideNgxMask():
  | import('@angular/core').Provider
  | import('@angular/core').EnvironmentProviders {
  throw new Error('Function not implemented.');
}
