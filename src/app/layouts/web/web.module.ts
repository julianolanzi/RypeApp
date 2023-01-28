import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { AuthComponent } from './../../pages/web/auth/auth.component';
import { HomeComponent } from './../../pages/web/home/home.component';
import { WebRoutes } from './web.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, AuthComponent],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(WebRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class WebModule {}

function provideNgxMask():
  | import('@angular/core').Provider
  | import('@angular/core').EnvironmentProviders {
  throw new Error('Function not implemented.');
}
