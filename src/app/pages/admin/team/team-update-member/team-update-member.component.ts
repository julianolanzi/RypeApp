import { PromoteAdmin } from './../../../../models/teams/manage-team/team-promote-admin';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserLoginSuccess } from 'src/app/models/auth/login/user-login-success';
import { RemoveMembers } from 'src/app/models/teams/manage-team/team-remove-member';
import { TeamDataSuccess } from 'src/app/models/teams/load-team/team-data-sucess';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { TeamRemoveMemberRequestAction } from 'src/app/shared/state-management/actions/teams/team-remove-member/team-load-remove-member-request.actions';
import { TeamLoadInfoRequestAction } from 'src/app/shared/state-management/actions/teams/info-team/team-load-info-request.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import {
  TeamInfoSelector,
  TeamLoadingTeam,
} from 'src/app/shared/state-management/selectors/team.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { TeamLoadPromoteAdminRequestAction } from 'src/app/shared/state-management/actions/teams/team-promote-admin/team-load-promote-admin-request.actions';
import { AlertService } from 'src/app/services/utils/alert.service';

@Component({
  selector: 'app-team-update-member',
  templateUrl: './team-update-member.component.html',
  styleUrls: ['./team-update-member.component.scss'],
})
export class TeamUpdateMemberComponent {
  cover = './assets/img/teams/cover-team.jpg'

  private subscriptions: Subscription = new Subscription();

  public user!: UserLoginSuccess;
  isLoadingInfo!: boolean;
  loading$!: Observable<boolean>;
  idTeam: string = '';
  team!: TeamDataSuccess;
  removeMemberUser!: RemoveMembers;
  promoteAdmin!: PromoteAdmin;

  constructor(private store: Store<GlobalState>, private Alerts: AlertService) {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));

  }


  ngOnInit(): void {
    this.loadUser();
    this.loadInfoTeam();
    this.initForm();
    this.loadTeamInfo();
  }

  initForm() {
    if (!this.isLoadingInfo) {
      this.getTeam();
    }
  }

  getTeam() {
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadInfoRequestAction(this.idTeam));
  }

  public loadTeamInfo() {
    const subscription = this.store
      .pipe(select(TeamInfoSelector))
      .subscribe((team) => {
        this.team = team;
      });

    this.subscriptions.add(subscription);
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

  public loadInfoTeam() {
    const subscription = this.store
      .pipe(select(TeamLoadingTeam))
      .subscribe((ative) => {
        this.isLoadingInfo = ative;
      });
    this.subscriptions.add(subscription);
  }

  public removeMember(item: any) {
    this.removeMemberUser = {
      idUser: item._id,
      idTeam: this.idTeam,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(
      new TeamRemoveMemberRequestAction(this.removeMemberUser)
    );
  }

  public promoteAdm(item: any) {
    this.promoteAdmin = {
      idUser: item._id,
      idTeam: this.idTeam,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(
      new TeamLoadPromoteAdminRequestAction(this.promoteAdmin)
    );
  }





}
