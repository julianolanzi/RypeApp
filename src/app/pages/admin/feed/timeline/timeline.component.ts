import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReactRequest } from 'src/app/models/feed/react-request';
import { TimelineRequest } from 'src/app/models/feed/timeline-request';
import { TimelineSuccess } from 'src/app/models/feed/timeline-success';
import { FeedTimelineRequestAction } from 'src/app/shared/state-management/actions/feed/feed-timelime/feed-load-timeline-request.actions';
import { FeedReactRequestAction } from 'src/app/shared/state-management/actions/feed/react-post/feed-load-react-request.actions';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { TimeLineInfo } from 'src/app/shared/state-management/selectors/feed.selector';
import { smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  enableSmallLoading$!: Observable<boolean>;
  PageOffset: number = 0;
  PageLimit: number = 10;

  ReactAction!: ReactRequest;

  timelineRequest!: TimelineRequest;


  toogleReact!: boolean;

  Posts$: Observable<TimelineSuccess[]> =
    this.store.select(TimeLineInfo);

  constructor(private store: Store<GlobalState>) {
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));



    // itemReact.addEventListener('click', () => {
    //   itemActive.classList.toggle('active');
    // });
  }
  ngOnInit(): void {
    this.loadTimeline();

  }
  enableReact(id: any) {
    let idtag = document.getElementById(id);
    let ok = idtag?.querySelector('.reaction-options-dropdown');
    ok?.classList.toggle('active');

  }

  enablePostOptions(id: any) {
    let idtag = document.getElementById(id);
    let ok = idtag?.querySelector('.simple-dropdown');
    ok?.classList.toggle('active');

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
}
