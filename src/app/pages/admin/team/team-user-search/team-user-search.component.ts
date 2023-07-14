import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserLoginSuccess } from 'src/app/models/auth/login/user-login-success';


import { RequestInviteUser } from 'src/app/models/notifications/notifications-request-invite-user';
import { TeamDataSuccess } from 'src/app/models/teams/load-team/team-data-sucess';
import { SearchMemberSucess } from 'src/app/models/teams/search-members/team-search-member-success';

import { AlertService } from 'src/app/services/utils/alert.service';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';

import { InviteUserNotificationsRequest } from 'src/app/shared/state-management/actions/notifications/team-notifications/request-invite-user/notifications-user-invite-request.actions';
import { TeamLoadClearStateAction } from 'src/app/shared/state-management/actions/teams/clear-state/team-load-clear-state.actions';
import { TeamLoadSearchMemberRequestAction } from 'src/app/shared/state-management/actions/teams/search-members/team-load-search-member-request.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { SearchMembers, TeamLoadingTeam } from 'src/app/shared/state-management/selectors/team.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-team-user-search',
  templateUrl: './team-user-search.component.html',
  styleUrls: ['./team-user-search.component.scss']
})
export class TeamUserSearchComponent {
  memberSearch!: FormGroup;
  isLoadingInfo!: boolean;
  idTeam: string = '';
  public user!: UserLoginSuccess;
  enableSmallLoading$!: Observable<boolean>;
  private subscriptions: Subscription = new Subscription();
  resultSearch$: Observable<SearchMemberSucess[]> =
    this.store.select(SearchMembers);

  userSelect!: any;

  isinviteAwait: boolean = false;
  requestInvite!: RequestInviteUser;
  team!: TeamDataSuccess;


  cover = './assets/img/teams/cover-team.jpg'
  constructor(private store: Store<GlobalState>, private Alerts: AlertService) {
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));
    this.memberSearch = new FormGroup({
      key: new FormControl('', [Validators.required]),
    });
  }

  get key() {
    return this.memberSearch.get('key')!;
  }

  ngOnInit(): void {
    this.loadUser();
  }
  memberSearchKey() {
    if (this.memberSearch.invalid) {
      return;
    }
    this.userSelect = this.memberSearch.value.key.toLowerCase();
    this.store.dispatch(new LoadingSmallActiveAction());

    this.store.dispatch(new TeamLoadSearchMemberRequestAction(this.userSelect));
  }
  public inviteUserTeam(item: any) {

    this.requestInvite = {
      team: this.idTeam,
      type: 'user',
      user: item.id,
    };

    this.store.dispatch(
      new InviteUserNotificationsRequest(this.requestInvite)
    );

  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
        this.idTeam = this.user.idTeam;
      });

    this.subscriptions.add(subscription);
  }

  public disableButton(id:string){
    let idtag = document.getElementById(id);
    idtag?.setAttribute('disabled', 'disabled');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.store.dispatch(new TeamLoadClearStateAction());
 }

}
