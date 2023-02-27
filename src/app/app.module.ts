import { AccountEffect } from './shared/state-management/effects/account.effects';
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
import { accountReducer } from './shared/state-management/reducers/account.reducer';
import { globalPagesReducer } from './shared/state-management/reducers/global-pages.reducer';

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
      auth: authReducer,
      account: accountReducer,
      globalPages: globalPagesReducer,
    }),
    EffectsModule.forRoot([
      AuthEffect,
      AccountEffect
    ]),
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly:true,
    }),
  ],
})
export class AppModule {}
