import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsService } from '../services/notifications/notifications.service';
import { LoadingComponent } from './loading/loading.component';
import { ModalGenericComponent } from './modal-generic/modal-generic.component';
import { SmallLoadingComponent } from './small-loading/small-loading.component';
import { ModalEditPostComponent } from './modal-edit-post/modal-edit-post.component';
import { ModalCommetsPostComponent } from './modal-commets-post/modal-commets-post.component';
import { CommentsComponent } from './components/comments/comments.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoverImageComponent } from './components/cover-image/cover-image.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [NotificationsService],
  declarations: [LoadingComponent, ModalGenericComponent, SmallLoadingComponent, ModalEditPostComponent, ModalCommetsPostComponent, CommentsComponent, EditPostComponent, CoverImageComponent],
  exports: [LoadingComponent, ModalGenericComponent, SmallLoadingComponent, ModalEditPostComponent, ModalCommetsPostComponent, CommentsComponent, EditPostComponent, CoverImageComponent],
})
export class SharedModule { }
