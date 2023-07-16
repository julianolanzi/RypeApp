import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-commets-post',
  templateUrl: './modal-commets-post.component.html',
  styleUrls: ['./modal-commets-post.component.scss']
})
export class ModalCommetsPostComponent {
  mostrar: boolean = false;

  toggle () {
    this.mostrar = !this.mostrar;
  }
}
