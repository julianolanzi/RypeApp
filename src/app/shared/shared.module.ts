import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsService } from '../services/notifications/notifications.service';
import { LoadingComponent } from './loading/loading.component';
import { ModalGenericComponent } from './modal-generic/modal-generic.component';
import { ModalNotificationsComponent } from './modal-notifications/modal-notifications.component';

@NgModule({
  imports: [CommonModule],
  providers: [NotificationsService],
  declarations: [LoadingComponent, ModalGenericComponent, ModalNotificationsComponent],
  exports: [LoadingComponent, ModalGenericComponent],
})
export class SharedModule {}
