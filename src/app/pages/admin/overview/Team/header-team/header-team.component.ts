import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { UserLoginSuccess } from 'src/app/models/auth/login/user-login-success';
import { TeamDataSuccess } from 'src/app/models/teams/load-team/team-data-sucess';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { TeamLoadQuitRequestAction } from 'src/app/shared/state-management/actions/teams/quit-team/team-load-quit-request.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { TeamInfo } from 'src/app/shared/state-management/selectors/overview.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-header-team',
  templateUrl: './header-team.component.html',
  styleUrls: ['./header-team.component.scss']
})
export class HeaderTeamComponent {
  enableSmallLoading$!: Observable<boolean>;
  private subscriptions: Subscription = new Subscription();
  team!: TeamDataSuccess;
  membersNumber: number = 0;
  public user!: UserLoginSuccess;
  isAdmin!: any;
  isAdminTeam$: Observable<boolean> | undefined;
  
  constructor(private store: Store<GlobalState>) {
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));
  }

  ngOnInit(): void {


    this.loadTeam();
    this.loadUser()
  }


  loadTeam() {
    const subscription = this.store
      .pipe(select(TeamInfo))
      .subscribe((response) => {
        this.team = response;
        this.membersNumber = this.team.members.length + this.team.adminMembers.length;

      });
    this.subscriptions.add(subscription);
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;

        if (user.rolesTeam == 'admin' || user.rolesTeam == 'sub-admin') {
          this.isAdminTeam$ = of(true);
        }
        if (user.role == 'admin') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;

        }
      });
   
    this.subscriptions.add(subscription);
  }

  quitTeam() {
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadQuitRequestAction(this.team._id));
  }
}
