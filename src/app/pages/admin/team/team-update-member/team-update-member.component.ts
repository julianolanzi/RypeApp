import { PromoteAdmin } from './../../../../models/teams/manage-team/team-promote-admin';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { RemoveMembers } from 'src/app/models/teams/manage-team/team-remove-member';
import { TeamDataSuccess } from 'src/app/models/teams/team-data-sucess';
import { SearchMemberSucess } from 'src/app/models/teams/team-search-member-success';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { TeamLoadSearchMemberRequestAction } from 'src/app/shared/state-management/actions/teams/search-members/team-load-search-member-request.actions';
import { TeamRemoveMemberRequestAction } from 'src/app/shared/state-management/actions/teams/team-remove-member/team-load-remove-member-request.actions';
import { TeamLoadInfoRequestAction } from 'src/app/shared/state-management/actions/teams/update-team/team-load-info-request.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import {
  SearchMembers,
  TeamDataSelector,
  TeamLoadingTeam,
} from 'src/app/shared/state-management/selectors/team.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { TeamLoadPromoteAdminRequestAction } from 'src/app/shared/state-management/actions/teams/team-promote-admin/team-load-promote-admin-request.actions';

@Component({
  selector: 'app-team-update-member',
  templateUrl: './team-update-member.component.html',
  styleUrls: ['./team-update-member.component.scss'],
})
export class TeamUpdateMemberComponent {
  memberSearch!: FormGroup;
  userSelect!: any;
  resultSearch$: Observable<SearchMemberSucess[]> =
    this.store.select(SearchMembers);

  private subscriptions: Subscription = new Subscription();
  public user!: UserLoginSuccess;
  isLoadingInfo!: boolean;
  loading$!: Observable<boolean>;
  idTeam: string = '';
  team!: TeamDataSuccess;
  removeMemberUser!: RemoveMembers;
  promoteAdmin!: PromoteAdmin;

  constructor(private store: Store<GlobalState>) {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    this.memberSearch = new FormGroup({
      key: new FormControl('', [Validators.required]),
    });
  }
  get key() {
    return this.memberSearch.get('key')!;
  }

  memberSearchKey() {
    if (this.memberSearch.invalid) {
      return;
    }
    this.userSelect = this.memberSearch.value.key;

    this.store.dispatch(new TeamLoadSearchMemberRequestAction(this.userSelect));
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
      .pipe(select(TeamDataSelector))
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

    this.store.dispatch(
      new TeamRemoveMemberRequestAction(this.removeMemberUser)
    );
  }

  public promoteAdm(item: any) {
    this.promoteAdmin = {
      idUser: item._id,
      idTeam: this.idTeam,
    }
    this.store.dispatch(new TeamLoadPromoteAdminRequestAction(this.promoteAdmin));
  }
}
