import { Component } from '@angular/core';
import { GlobalState } from '../../state-management/states/global.state';
import { Store, select } from '@ngrx/store';
import { smallLoading } from '../../state-management/selectors/global-pages.selector';
import { Observable, Subscription } from 'rxjs';
import { LoadingSmallActiveAction } from '../../state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { AuthSelector } from '../../state-management/selectors/auth.selector';
import { PostCommentsLoadRequestAction } from '../../state-management/actions/feed/comments-load/feed-load-comments-post-request.actions';
import { LoadCommentsSuccess } from 'src/app/models/feed/comments/comments-load-success';
import { ComentsPostInfo } from '../../state-management/selectors/feed.selector';
import { CreateComment } from 'src/app/models/feed/comments/comments-create';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostCommentsCreateRequestAction } from '../../state-management/actions/feed/comments-create/load-create-comment-request.actions';
import { PostCommentsDeleteRequestAction } from '../../state-management/actions/feed/comments-delete/load-delete-comment-request.actions';
import { DeleteComment } from 'src/app/models/feed/comments/comments-delete';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  enableSmallLoading$!: Observable<boolean>;
  private subscriptions: Subscription = new Subscription();
  Comments$: Observable<LoadCommentsSuccess[]> = this.store.select(ComentsPostInfo);

  user: any;
  post!: any;

  dataPost!: any;

  createCommentRequest!: CreateComment;
  deleteComment!: DeleteComment;
  createCommentForm!: FormGroup;



  constructor(private store: Store<GlobalState>) {
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));

    this.createCommentForm = new FormGroup({
      idPost: new FormControl(''),
      message: new FormControl('', [Validators.required]),
    })
  }

  get message() {
    return this.createCommentForm.get('message');
  }
  ngOnInit(): void {
    this.loadId();

  }

  loadComments(post: any) {
    this.store.dispatch(new LoadingSmallActiveAction());
    this.store.dispatch(new PostCommentsLoadRequestAction(post.id));

    this.dataPost = post;


  }

  public loadId() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;

      });

    this.subscriptions.add(subscription);
  }

  createCommentSend() {
    if (this.createCommentForm.invalid) {
      return;
    }

    let valuesForm = Object.assign({}, this.createCommentRequest, this.createCommentForm.value);

    this.createCommentRequest = {
      ...valuesForm,
      idPost: this.dataPost.id,
    }

    this.store.dispatch(new PostCommentsCreateRequestAction(this.createCommentRequest));

    this.createCommentForm.reset();

  }

  deleteCommentItem(item: any){

    this.deleteComment = {
      idPost: item.idPost,
      idComment: item._id,
    }
    
    this.store.dispatch(new PostCommentsDeleteRequestAction(this.deleteComment));
  }


}
