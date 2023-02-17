import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { ModalGenericComponent } from './modal-generic/modal-generic.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingComponent, ModalGenericComponent],
  exports: [LoadingComponent, ModalGenericComponent],
})
export class SharedModule {}
