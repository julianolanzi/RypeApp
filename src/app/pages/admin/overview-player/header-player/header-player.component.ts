import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PlayerSuccessResponse } from 'src/app/models/overview-player/player/player-success-respose';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { PlayerData } from 'src/app/shared/state-management/selectors/overviewplayer.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-header-player',
  templateUrl: './header-player.component.html',
  styleUrls: ['./header-player.component.scss']
})
export class HeaderPlayerComponent {
  user!: PlayerSuccessResponse;
  enableSmallLoading$!: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();
  constructor(private store: Store<GlobalState>) {
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadingSmallActiveAction());
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadPlayer();
  }

  loadPlayer() {
    const subscription = this.store
      .pipe(select(PlayerData))
      .subscribe((user) =>
        this.user = user,
       
      );

    this.subscriptions.add(subscription);
  }

}
