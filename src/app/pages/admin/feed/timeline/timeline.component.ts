import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EditPostRequest } from 'src/app/models/feed/edit-post/edit-post-request';
import { ReactRequest } from 'src/app/models/feed/reacts/react-request';
import { TimelineRequest } from 'src/app/models/feed/timeline/timeline-request';
import { TimelineSuccess } from 'src/app/models/feed/timeline/timeline-success';
import { FeedDeletePostImgRequestAction } from 'src/app/shared/state-management/actions/feed/delete-post/feed-load-delete-post-img-request.actions';
import { FeedDeletePostRequestAction } from 'src/app/shared/state-management/actions/feed/delete-post/feed-load-delete-post-request.actions';
import { FeedPostEditRequestAction } from 'src/app/shared/state-management/actions/feed/edit-post/feed-edit-post-request.actions';
import { FeedTimelineRequestAction } from 'src/app/shared/state-management/actions/feed/feed-timelime/feed-load-timeline-request.actions';
import { FeedReactRequestAction } from 'src/app/shared/state-management/actions/feed/react-post/feed-load-react-request.actions';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { LoadingNotificationsDisabledAction } from 'src/app/shared/state-management/actions/global-pages/global-notifications/loading-notifications-disabled.actions';
import { LoadOpRoutingIdAction } from 'src/app/shared/state-management/actions/overview/user/rounting-id/op-load-routing-id.actions';
import { TimeLineInfo } from 'src/app/shared/state-management/selectors/feed.selector';
import { smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  UserUpdatePost!: any;
  UpdatePostForm!: FormGroup;
  UpdatePostRequest!: EditPostRequest;
  apiLoaded = false;
  lastId: string = '';
  enableSmallLoading$!: Observable<boolean>;
  PageOffset: number = 0;
  PageLimit: number = 15;

  ReactAction!: ReactRequest;

  timelineRequest!: TimelineRequest;


  toogleReact!: boolean;

  Posts$: Observable<TimelineSuccess[]> =
    this.store.select(TimeLineInfo);

  constructor(private store: Store<GlobalState>, private router: Router,) {
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
    this.loadTimeline();

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
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
  loadTimeline() {
    this.timelineRequest = {
      limit: this.PageLimit,
      offset: this.PageOffset,
    }
    this.store.dispatch(new LoadingSmallActiveAction({flag: true, message: 'Carregando Timeline ...'}));
    this.store.dispatch(new FeedTimelineRequestAction(this.timelineRequest));
  }
  deletePost(post: any) {
    if(post.type == 'imagem'){
      this.store.dispatch(new FeedDeletePostRequestAction(post.id));
      this.store.dispatch(new FeedDeletePostImgRequestAction(post.postImageName));
    }else{
      this.store.dispatch(new FeedDeletePostRequestAction(post.id));
    }

    
  }
  updatePost() {
    const formData = Object.assign({}, this.UpdatePostRequest, this.UpdatePostForm.value);

    this.UpdatePostRequest = {
      ...formData,
      id: this.UserUpdatePost.id,
    }

    this.store.dispatch(new FeedPostEditRequestAction(this.UpdatePostRequest))
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

  OpenOverviewPlayer(player:any){
    
    this.store.dispatch(new LoadOpRoutingIdAction(player.author.id));
    this.router.navigate(['player/'+ player.author.nickname]);
  }

  loadMoreText(id:any){
 
    let idtag = document.getElementById(id + 'more-text');
    idtag?.classList.toggle('all-text');
    let modeText = document.querySelector('.widget-box-status-text-button') as HTMLElement;
    if(idtag?.classList.contains('all-text')){
      modeText.innerText = 'Ver menos';
    }else{
      modeText.innerText = 'Ver mais';
    }
   
  }

  


}
