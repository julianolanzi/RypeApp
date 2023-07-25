import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { EditPostRequest } from 'src/app/models/feed/edit-post/edit-post-request';
import { ReactRequest } from 'src/app/models/feed/reacts/react-request';
import { TimelineSuccess } from 'src/app/models/feed/timeline/timeline-success';
import { FeedDeletePostRequestAction } from 'src/app/shared/state-management/actions/feed/delete-post/feed-load-delete-post-request.actions';
import { FeedPostEditRequestAction } from 'src/app/shared/state-management/actions/feed/edit-post/feed-edit-post-request.actions';
import { FeedReactRequestAction } from 'src/app/shared/state-management/actions/feed/react-post/feed-load-react-request.actions';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { LoadingNotificationsDisabledAction } from 'src/app/shared/state-management/actions/global-pages/global-notifications/loading-notifications-disabled.actions';
import { OpPlayerTimelineRequestAction } from 'src/app/shared/state-management/actions/overview-player/load-timeline/op-load-timeline-request-actions';
import { smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { PlayerId, PlayerTimeline } from 'src/app/shared/state-management/selectors/overviewplayer.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-timeline-player',
  templateUrl: './timeline-player.component.html',
  styleUrls: ['./timeline-player.component.scss']
})
export class TimelinePlayerComponent {
  idPlayer: string = '';
  private subscriptions: Subscription = new Subscription();
  Posts$: Observable<TimelineSuccess[]> =
  this.store.select(PlayerTimeline);
  enableSmallLoading$!: Observable<boolean>;
  ReactAction!: ReactRequest;
  UpdatePostForm!: FormGroup;
  UpdatePostRequest!: EditPostRequest;
  UserUpdatePost!: any;

  constructor(private store: Store<GlobalState>) { 
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));

    this.UpdatePostForm = new FormGroup({
      title: new FormControl(''),
      text: new FormControl(''),
      type: new FormControl(''),
      urlPost: new FormControl(''),
      urlVideo: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadingSmallActiveAction());
    this.loadId();
    this.loadTimeLinePlayer();
  }

  public loadId() {
    const subscription = this.store
      .pipe(select(PlayerId))
      .subscribe((player) => {
        this.idPlayer = player;
      });

    this.subscriptions.add(subscription);
  }

  loadTimeLinePlayer() {
    this.store.dispatch(new LoadingSmallActiveAction());
    this.store.dispatch(new OpPlayerTimelineRequestAction(this.idPlayer))
  }
  openEditPost(post: any) {
  
    this.UserUpdatePost = post;


    this.UpdatePostForm.patchValue({
      text: post.text,
      type: post.type,
      urlPost: post.urlPost,
      urlVideo: post.urlVideo,
    });
  }

  enableReact(id: any) {
    let idtag = document.getElementById(id + 'react');
    idtag?.classList.toggle('active');

    this.store.dispatch(new LoadingNotificationsDisabledAction());

    document.addEventListener("mouseup", function (event) {
      var obj = document.getElementById(id + 'react');
      if (!obj?.contains(event.target as HTMLElement)) {
        idtag?.classList.remove('active');
      } else {

      }
    })
  }
  enablePostOptions(id: any) {
    let idtag = document.getElementById(id + 'settings');
    idtag?.classList.toggle('active');

    document.addEventListener("mouseup", function (event) {
      var obj = document.getElementById(id + 'react');
      if (!obj?.contains(event.target as HTMLElement)) {
        idtag?.classList.remove('active');
      } else {

      }
    })
    this.store.dispatch(new LoadingNotificationsDisabledAction());
  }
  reactedPost(id: any, action: string) {
    this.ReactAction = {
      id: id,
      react: action,
      user: '',
    }
    this.enableReact(id);
    this.store.dispatch(new FeedReactRequestAction(this.ReactAction));
  }
  updatePost() {
    const formData = Object.assign({}, this.UpdatePostRequest, this.UpdatePostForm.value);

    this.UpdatePostRequest = {
      ...formData,
      id: this.UserUpdatePost.id,
    }

    this.store.dispatch(new FeedPostEditRequestAction(this.UpdatePostRequest))
  }
 

  deletePost(id: any) {
    this.store.dispatch(new FeedDeletePostRequestAction(id));
  }
}
