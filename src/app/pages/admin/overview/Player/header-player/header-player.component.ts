import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PlayerSuccessResponse } from 'src/app/models/overview-player/player/player-success-respose';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { LoadOpRoutingTeamIdAction } from 'src/app/shared/state-management/actions/overview/team/routing-id-team/op-load-routing-team-id.actions';
import { OpPlayerTimelineRequestAction } from 'src/app/shared/state-management/actions/overview/user/load-timeline/op-load-timeline-request-actions';
import { smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { PlayerData } from 'src/app/shared/state-management/selectors/overview.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-header-player',
  templateUrl: './header-player.component.html',
  styleUrls: ['./header-player.component.scss']
})
export class HeaderPlayerComponent {
  enableUser!: boolean;
  user!: PlayerSuccessResponse;
  enableSmallLoading$!: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();
  constructor(private store: Store<GlobalState>, private router: Router) {
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));
  }

  ngOnInit(): void {


    this.loadPlayer();
  }

  loadPlayer() {
    const subscription = this.store
      .pipe(select(PlayerData))
      .subscribe((user) => {
        this.user = user;
        if(this.user.name.length > 0){
          this.store.dispatch(new LoadingSmallActiveAction({flag: true, message: 'Carregando Timeline do Jogador'}));
          this.store.dispatch(new OpPlayerTimelineRequestAction(this.user.id))
        }
      });
    this.subscriptions.add(subscription);
  }

  OvewViewTeam(){
    this.store.dispatch(new LoadOpRoutingTeamIdAction(this.user.team[0]._id));
    this.router.navigate(['team-overview']);
  }

}
