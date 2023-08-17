import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PostCreateRequest } from 'src/app/models/feed/create-post/post-create-request';
import { FeedPostCreateRequestAction } from 'src/app/shared/state-management/actions/feed/feed-post/feed-create-post-request.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-text-post',
  templateUrl: './text-post.component.html',
  styleUrls: ['./text-post.component.scss']
})
export class TextPostComponent {

  @Output() resetPost = new EventEmitter();

  postFormText!: FormGroup;
  postRequestText!: PostCreateRequest;
  public user!: any;

  counterText: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<GlobalState>) {
    this.postFormText = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(1500)]),
      type: new FormControl(''),
    })

    this.postFormText.get('text')?.valueChanges.pipe().subscribe((newvalue) => {
      this.counterText = newvalue.length;
    })
  }

  get text() {
    return this.postFormText.get('text');
  }

  createPostText() {
    if (this.postFormText.invalid) {
      return;
    }

    this.postRequestText = Object.assign({}, this.postRequestText, this.postFormText.value);

    this.postRequestText = {
      ...this.postFormText.value,
      type: 'text'
    }

    this.store.dispatch(new FeedPostCreateRequestAction(this.postRequestText));
    this.postFormText.reset();
    this.resetPost.emit();
  }

  ngOnInit(): void {
    this.loadUser()
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
      });
    this.subscriptions.add(subscription);
  }
}
