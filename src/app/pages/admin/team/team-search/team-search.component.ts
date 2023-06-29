import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TeamSearchSelector } from 'src/app/shared/state-management/selectors/team.selector';
import { SearchTeamSuccess } from 'src/app/models/teams/search-team-sucess';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { TeamLoadAction } from 'src/app/shared/state-management/actions/teams/team-load/team-load.actions';
import { UserNotificationsSuccess } from 'src/app/models/notifications/notifications-user-success';
import { AlertService } from 'src/app/services/utils/alert.service';
import { RequestTeam } from 'src/app/models/notifications/notifications-request-team';
import { InviteTeamNotificationsRequest } from 'src/app/shared/state-management/actions/notifications/team-notifications/request-invite-team/notifications-team-invite-request.actions';
import { TeamLoadRequestPublicTeam } from 'src/app/shared/state-management/actions/teams/request-public-team/team-load-request-public-team.actions';
import { smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { TeamLoadClearStateAction } from 'src/app/shared/state-management/actions/teams/clear-state/team-load-clear-state.actions';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.scss'],
})
export class TeamSearchComponent {
  teamSearch!: FormGroup;
  cover = './assets/img/teams/cover-team.jpg'
  notifications!: UserNotificationsSuccess[];
  enableSmallLoading$!: Observable<boolean>;
  Teams$: Observable<SearchTeamSuccess[]> =
    this.store.select(TeamSearchSelector);
  user: any;
  idTeam: string = '';
  teamKey: string = '';
  
  requestInvite!: RequestTeam;

  isinviteAwait: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<GlobalState>,  private Alerts: AlertService,) {
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));
    this.teamSearch = new FormGroup({
      key: new FormControl('', [Validators.required]),
    });
  }

  get key() {
    return this.teamSearch.get('key')!;
  }
  ngOnInit(): void {
    this.loadUser();
  
  }

  searchTeam() {

    if (this.teamSearch.invalid) {
      return;
    }
    this.teamKey = this.teamSearch.value.key;
    this.store.dispatch(new LoadingSmallActiveAction());
    this.store.dispatch(new TeamLoadAction(this.teamKey));
  }

  joinTeamPublic(team: any) {
    this.idTeam = team.id;

    const data = {
      user: this.user.id,
      team: this.idTeam,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadRequestPublicTeam(data));
  }

  requestTeamPrivate(team: any) {
    
    this.requestInvite = {
      team: team.id,
      type: 'team'
    }
    console.log(this.requestInvite);
    this.store.dispatch(new InviteTeamNotificationsRequest(this.requestInvite));
   
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
      });
    this.subscriptions.add(subscription);
  }

  public disableButton(id:string){
    let idtag = document.getElementById(id);
    idtag?.setAttribute('disabled', 'disabled');
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(new TeamLoadClearStateAction());
  }

}
