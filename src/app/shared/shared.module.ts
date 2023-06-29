import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsService } from '../services/notifications/notifications.service';
import { LoadingComponent } from './loading/loading.component';
import { ModalGenericComponent } from './modal-generic/modal-generic.component';
import { SmallLoadingComponent } from './small-loading/small-loading.component';

@NgModule({
  imports: [CommonModule],
  providers: [NotificationsService],
  declarations: [LoadingComponent, ModalGenericComponent, SmallLoadingComponent],
  exports: [LoadingComponent, ModalGenericComponent, SmallLoadingComponent],
})
export class SharedModule {}
