import { AdminModule } from './layouts/admin/admin.module';
import { AdminComponent } from './layouts/admin/admin.component';
import { WebComponent } from './layouts/web/web.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/layouts/web/web.module').then((m) => m.WebModule),
      },
    ],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/layouts/admin/admin.module').then(
            (m) => m.AdminModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
