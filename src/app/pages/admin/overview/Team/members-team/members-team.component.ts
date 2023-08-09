import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TeamDataSuccess } from 'src/app/models/teams/load-team/team-data-sucess';
import { LoadOpRoutingIdAction } from 'src/app/shared/state-management/actions/overview/user/rounting-id/op-load-routing-id.actions';
import { smallLoading } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { TeamInfo } from 'src/app/shared/state-management/selectors/overview.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-members-team',
  templateUrl: './members-team.component.html',
  styleUrls: ['./members-team.component.scss']
})
export class MembersTeamComponent {
  enableSmallLoading$!: Observable<boolean>;
  team!: TeamDataSuccess;
  private subscriptions: Subscription = new Subscription();
  
  constructor(private store: Store<GlobalState>, private router: Router,) { 
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
      });
    this.subscriptions.add(subscription);
  }
  OpenOverviewPlayer(id:string, name:string){
    
    this.store.dispatch(new LoadOpRoutingIdAction(id));
    this.router.navigate(['player/'+ name]);
  }
  OpenOverviewPlayerMembers(item:any){
    this.store.dispatch(new LoadOpRoutingIdAction(item._id));
    this.router.navigate(['player/'+ item.nickname]);
  }
}
