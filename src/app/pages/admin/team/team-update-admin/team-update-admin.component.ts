import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { TeamDataSuccess } from 'src/app/models/teams/team-data-sucess';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { TeamLoadInfoRequestAction } from 'src/app/shared/state-management/actions/teams/update-team/team-load-info-request.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import {
  TeamDataSelector,
  TeamLoadingTeam,
} from 'src/app/shared/state-management/selectors/team.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-team-update-admin',
  templateUrl: './team-update-admin.component.html',
  styleUrls: ['./team-update-admin.component.scss'],
})
export class TeamUpdateAdminComponent {
  team!: TeamDataSuccess;
  idTeam: string = '';
  loading$!: Observable<boolean>;
  isLoadingInfo!: boolean;
  public user!: UserLoginSuccess;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<GlobalState>) {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadUser();
    this.loadInfoTeam();
    this.initForm();
    this.loadTeamInfo();
  }

  getTeam() {
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadInfoRequestAction(this.idTeam));
  }

  initForm() {
    if (!this.isLoadingInfo) {
      this.getTeam();
    }
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

  public loadTeamInfo() {
    const subscription = this.store
      .pipe(select(TeamDataSelector))
      .subscribe((team) => {
        this.team = team;
      });

    this.subscriptions.add(subscription);
  }
}
