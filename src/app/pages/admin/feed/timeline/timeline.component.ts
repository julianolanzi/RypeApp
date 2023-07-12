import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReactRequest } from 'src/app/models/feed/react-request';
import { TimelineRequest } from 'src/app/models/feed/timeline-request';
import { TimelineSuccess } from 'src/app/models/feed/timeline-success';
import { FeedDeletePostRequestAction } from 'src/app/shared/state-management/actions/feed/delete-post/feed-load-delete-post-request.actions';
import { FeedTimelineRequestAction } from 'src/app/shared/state-management/actions/feed/feed-timelime/feed-load-timeline-request.actions';
import { FeedReactRequestAction } from 'src/app/shared/state-management/actions/feed/react-post/feed-load-react-request.actions';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { LoadingNotificationsDisabledAction } from 'src/app/shared/state-management/actions/global-pages/global-notifications/loading-notifications-disabled.actions';
import { TimeLineInfo } from 'src/app/shared/state-management/selectors/feed.selector';
import { smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  lastId: string = '';
  enableSmallLoading$!: Observable<boolean>;
  PageOffset: number = 1;
  PageLimit: number = 10;

  ReactAction!: ReactRequest;

  timelineRequest!: TimelineRequest;


  toogleReact!: boolean;

  Posts$: Observable<TimelineSuccess[]> =
    this.store.select(TimeLineInfo);

  constructor(private store: Store<GlobalState>) {
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));


  }
  ngOnInit(): void {
    this.loadTimeline();


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
    this.store.dispatch(new LoadingSmallActiveAction());
    this.store.dispatch(new FeedTimelineRequestAction(this.timelineRequest));



  }

  deletePost(id:any) {
   this.store.dispatch(new FeedDeletePostRequestAction(id));
  }


}
