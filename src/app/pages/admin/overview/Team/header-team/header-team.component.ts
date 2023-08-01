import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TeamDataSuccess } from 'src/app/models/teams/load-team/team-data-sucess';
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

  constructor(private store: Store<GlobalState>) {
    this.enableSmallLoading$ = this.store.pipe(select(smallLoading));
  }

  ngOnInit(): void {


    this.loadTeam();
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
}
