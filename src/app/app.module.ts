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
import { SharedModule } from "./shared/shared.module";


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
        SharedModule
    ]
})
export class AppModule {}
