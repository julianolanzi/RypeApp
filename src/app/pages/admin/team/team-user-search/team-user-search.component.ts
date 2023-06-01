import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';


import { RequestInviteUser } from 'src/app/models/notifications/notifications-request-invite-user';
import { UserNotificationsSuccess } from 'src/app/models/notifications/notifications-user-success';
import { TeamDataSuccess } from 'src/app/models/teams/team-data-sucess';
import { SearchMemberSucess } from 'src/app/models/teams/team-search-member-success';

import { AlertService } from 'src/app/services/utils/alert.service';

import { InviteUserNotificationsRequest } from 'src/app/shared/state-management/actions/notifications/team-notifications/request-invite-user/notifications-user-invite-request.actions';
import { TeamLoadSearchMemberRequestAction } from 'src/app/shared/state-management/actions/teams/search-members/team-load-search-member-request.actions';
import { TeamNotifications } from 'src/app/shared/state-management/selectors/notifications.selector';
import { SearchMembers } from 'src/app/shared/state-management/selectors/team.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-team-user-search',
  templateUrl: './team-user-search.component.html',
  styleUrls: ['./team-user-search.component.scss']
})
export class TeamUserSearchComponent {
  memberSearch!: FormGroup;

  private subscriptions: Subscription = new Subscription();

  resultSearch$: Observable<SearchMemberSucess[]> =
  this.store.select(SearchMembers);

  userSelect!: any;
  
  isinviteAwait: boolean = false;
  requestInvite!: RequestInviteUser;
  notifications!: UserNotificationsSuccess[];
  team!: TeamDataSuccess;


  cover = './assets/img/teams/cover-team.jpg'
  constructor(private store: Store<GlobalState>, private Alerts: AlertService) {
    
    this.memberSearch = new FormGroup({
      key: new FormControl('', [Validators.required]),
    });
  }

  get key() {
    return this.memberSearch.get('key')!;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  memberSearchKey() {
    if (this.memberSearch.invalid) {
      return;
    }
    this.userSelect = this.memberSearch.value.key;

    this.store.dispatch(new TeamLoadSearchMemberRequestAction(this.userSelect));
  }

  public inviteUserTeam(item: any) {
    if(this.notifications.length != 0){
      const invite = this.verifyInvite(item);
    }else{
      this.requestInvite = {
        team: this.team._id,
        type: 'user',
        user: item._id,
      };
      this.store.dispatch(
        new InviteUserNotificationsRequest(this.requestInvite)
      );
    }
  }

  public loadNotifications() {
    const subscription = this.store
      .pipe(select(TeamNotifications))
      .subscribe((result) => {
        this.notifications = result;
        console.log(this.notifications);
      });

    this.subscriptions.add(subscription);
  }

  public verifyInvite(user: any) {
    for (let item of this.notifications) {
      if (user._id == item.user) {
        this.isinviteAwait = true;
        this.Alerts.error(
          'Voce já enviou solicitação para esse jogador',
          'Ops'
        );
      }
      if (user._id != item.user) {
        this.isinviteAwait = true;

        this.requestInvite = {
          team: this.team._id,
          type: 'user',
          user: user._id,
        };
        this.store.dispatch(
          new InviteUserNotificationsRequest(this.requestInvite)
        );
      }
    }
  }
 
}
