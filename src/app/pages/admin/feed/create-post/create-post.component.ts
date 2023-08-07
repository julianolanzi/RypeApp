import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PostCreateRequest } from 'src/app/models/feed/create-post/post-create-request';
import { FeedPostCreateRequestAction } from 'src/app/shared/state-management/actions/feed/feed-post/feed-create-post-request.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  user: any;

  isVideo: boolean = false;
  isImage: boolean = false;
  istext: boolean = false;
  private subscriptions: Subscription = new Subscription();
  constructor(private store: Store<GlobalState>) {

  }



  ngOnInit(): void {
    this.loadUser();

  }
  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
      });

    this.subscriptions.add(subscription);
  }

  isOnlyText(){
    this.isVideo = false;
    this.isImage = false;
    this.istext = true;
  }
  isImageUrl() {
    this.isVideo = false;
    this.istext = false;
    this.isImage = true;
  }
  isVideoYoutube(){
    this.isImage = false;
    this.istext = false;
    this.isVideo = true;
  }
}
