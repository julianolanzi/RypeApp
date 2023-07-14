import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-edit-post',
  templateUrl: './modal-edit-post.component.html',
  styleUrls: ['./modal-edit-post.component.scss']
})
export class ModalEditPostComponent {
  mostrar: boolean = false;

  toggle () {
    this.mostrar = !this.mostrar;
  }
}
