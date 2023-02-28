import { Injectable } from '@angular/core';
import { SweetAlertIcon } from 'sweetalert2';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  public success(message: string, title?: any): void {
    this.showAlert(title, message, 'success');
  }
  public info(message: string, title?: any): void {
    this.showAlert(title, message, 'info');
  }
  public error(message: string, title?: any): void {
    this.showAlert(title, message, 'error');
  }

  private showAlert(
    title: string,
    message: string,
    icon: SweetAlertIcon
  ): void {
    Swal.fire(title, message, icon);
  }
}
