import { WebnavbarComponent } from './webnavbar/webnavbar.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    WebnavbarComponent,
    NotificationsComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    WebnavbarComponent,
    NotificationsComponent,
  ],
})
export class ComponentsModule {}
