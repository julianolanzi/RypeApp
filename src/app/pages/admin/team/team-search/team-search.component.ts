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
import { UserNotifications } from 'src/app/shared/state-management/selectors/notifications.selector';
import { UserNotificationsSuccess } from 'src/app/models/notifications/notifications-user-success';
import { AlertService } from 'src/app/services/utils/alert.service';
import { RequestTeam } from 'src/app/models/notifications/notifications-request-team';
import { InviteTeamNotificationsRequest } from 'src/app/shared/state-management/actions/notifications/team-notifications/request-invite-team/notifications-team-invite-request.actions';
import { TeamLoadRequestPublicTeam } from 'src/app/shared/state-management/actions/teams/request-public-team/team-load-request-public-team.actions';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.scss'],
})
export class TeamSearchComponent {
  teamSearch!: FormGroup;

  notifications!: UserNotificationsSuccess[];

  Teams$: Observable<SearchTeamSuccess[]> =
    this.store.select(TeamSearchSelector);
  user: any;
  idTeam: string = '';
  teamKey: string = '';

  requestInvite!: RequestTeam;

  isinviteAwait: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<GlobalState>,  private Alerts: AlertService,) {
    this.teamSearch = new FormGroup({
      key: new FormControl('', [Validators.required]),
    });
  }

  get key() {
    return this.teamSearch.get('key')!;
  }
  ngOnInit(): void {
    this.loadUser();
    this.loadNotifications();
  }

  searchTeam() {
    // this.Teams = [];
    if (this.teamSearch.invalid) {
      return;
    }
    this.teamKey = this.teamSearch.value.key;

    this.store.dispatch(new TeamLoadAction(this.teamKey));
  }

  joinTeamPublic(team: any) {
    this.idTeam = team._id;

    const data = {
      user: this.user.id,
      team: this.idTeam,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadRequestPublicTeam(data));
  }

  requestTeamPrivate(team: any) {
    if (this.notifications.length != 0) {

      const invite = this.verifyInvite(team._id);

    }else {
      this.requestInvite = {
        team: team._id,
        type: 'team'
      }
      this.isinviteAwait = false;
      this.store.dispatch(new InviteTeamNotificationsRequest(this.requestInvite));
    }
  }

  public verifyInvite(id: string) {
    for (let item of this.notifications) {
      if (id == item.team) {
        this.isinviteAwait = false;

        this.Alerts.error('Voce já possui uma solicitação com esse time.', 'Ops');
      }
      if (id != item.team) {
        this.isinviteAwait = true;
        this.requestInvite = {
          team: id,
          type: 'team'
        }
        this.store.dispatch(new InviteTeamNotificationsRequest(this.requestInvite));
      }
    }
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
      });
    this.subscriptions.add(subscription);
  }

  public loadNotifications() {
    const subscription = this.store
      .pipe(select(UserNotifications))
      .subscribe((result) => {
        this.notifications = result;
      });

    this.subscriptions.add(subscription);
  }
}
