import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.scss']
})
export class ModalGenericComponent {
  mostrar: boolean = false;

  toggle () {
    this.mostrar = !this.mostrar;
  }
}
