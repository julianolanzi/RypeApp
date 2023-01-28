import { WebComponent } from './layouts/web/web.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { WebModule } from './layouts/web/web.module';

@NgModule({
  declarations: [AppComponent, WebComponent],
  imports: [BrowserModule, RouterModule, AppRoutingModule, WebModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
