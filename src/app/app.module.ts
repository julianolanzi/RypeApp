import { AdminEffect, AdminReducer } from './shared/state-management/admin/admin.state';
import { AdminComponent } from './layouts/admin/admin.component';
import { AdminModule } from './layouts/admin/admin.module';
import { ComponentsModule } from './components/components.module';
import { WebComponent } from './layouts/web/web.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { WebModule } from './layouts/web/web.module';
import { SharedModule } from './shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './shared/state-management/reducers/auth.reducer';
import { AuthEffect } from './shared/state-management/effects/auth.effect';

@NgModule({
  declarations: [AppComponent, WebComponent, AdminComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    WebModule,
    ComponentsModule,
    AdminModule,
    SharedModule,
    StoreModule.forRoot({
      auth: authReducer
    }),
    EffectsModule.forRoot([
      AuthEffect
    ]),
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly:true,
    }),
  ],
})
export class AppModule {}
