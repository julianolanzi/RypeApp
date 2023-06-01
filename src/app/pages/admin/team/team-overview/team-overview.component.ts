import { TeamDataSuccess } from './../../../../models/teams/team-data-sucess';
import { Component } from '@angular/core';

import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { Observable, Subscription } from 'rxjs';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { select, Store } from '@ngrx/store';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { TeamDataSelector, TeamLoadingTeam } from 'src/app/shared/state-management/selectors/team.selector';

import { DatePipe } from '@angular/common';
import { TeamLoadInfoRequestAction } from 'src/app/shared/state-management/actions/teams/update-team/team-load-info-request.actions';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss'],
})
export class TeamOverviewComponent {
  Team!: TeamDataSuccess;
  idTeam: string = '';
  isadmin: boolean = false;
  loading$!: Observable<boolean>;
  public user!: UserLoginSuccess;
  url: any;
  isprivate: string = '';

  isTeam: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<GlobalState>, private datePipe: DatePipe) {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    this.isTeam = false;



  }


  ngOnInit(): void {
    this.isTeam = false;
    this.loadUser();
    this.getTeam();
    this.loadTeamInfo();
  }

  getTeam() {
    if (this.idTeam != '') {
      this.store.dispatch(new LoadingActiveAction());
      this.store.dispatch(new TeamLoadInfoRequestAction(this.idTeam));
    }
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
        this.idTeam = this.user.idTeam;
        if (this.idTeam == '') {
        }
      });

    this.subscriptions.add(subscription);
  }




  public loadTeamInfo() {
    const subscription = this.store
      .pipe(select(TeamDataSelector))
      .subscribe((team) => {
        this.Team = team;
        if (this.Team.idTeam != '') {
          this.isTeam = true;
        }
        this.url = team.url;
        this.isprivate = this.Team.private.toString();

      });

    this.subscriptions.add(subscription);
  }
}
