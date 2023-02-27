import { Component } from '@angular/core';

import { TeamData } from '../../../../models/teams/team-data';
import { TeamService } from 'src/app/services/teams/team.service';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { select, Store } from '@ngrx/store';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss'],
})
export class TeamOverviewComponent {
  errors: any[] = [];
  id: string = '';
  Team!: TeamData;
  idTeam: string = '';
  isadmin: boolean = false;

  public user!: UserLoginSuccess;
  private subscriptions: Subscription = new Subscription();
  constructor(private store: Store<GlobalState>) {
    
  }

  ngOnInit(): void {
    this.loadUser();
  }


  public loadUser(){
    const subscription = this.store.pipe(select(AuthSelector)).subscribe((user) => {
      this.user = user;
      this.idTeam = this.user.idTeam;
    })

    this.subscriptions.add(subscription);
  }
}
