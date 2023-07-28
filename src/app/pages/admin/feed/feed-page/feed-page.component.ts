import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent {
  constructor(private store: Store<GlobalState>) { 
    this.store.dispatch(new LoadingSmallActiveAction({flag: true, message: 'Carregando Timeline ...'}));
  }
}
