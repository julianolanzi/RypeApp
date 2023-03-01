import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { Store, select } from '@ngrx/store';
import { TeamLoadAction } from 'src/app/shared/state-management/actions/teams/team-load.actions';
import { Observable, Subscription } from 'rxjs';
import { TeamSearchSelector } from 'src/app/shared/state-management/selectors/team.selector';
import { SearchTeamSuccess } from 'src/app/models/teams/search-team-sucess';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { TeamLoadRequestPublicTeam } from 'src/app/shared/state-management/actions/teams/team-load-request-public-team.actions';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.scss'],
})
export class TeamSearchComponent {
  errors: any[] = [];
  teamSearch!: FormGroup;

  Teams$: Observable<SearchTeamSuccess[]> =
    this.store.select(TeamSearchSelector);
  user: any;
  idTeam: string = '';
  teamKey: string = '';

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<GlobalState>) {
    this.teamSearch = new FormGroup({
      key: new FormControl('', [Validators.required]),
    });
  }

  get key() {
    return this.teamSearch.get('key')!;
  }
  ngOnInit(): void {
    this.loadUser();
  }

  searchTeam() {
    // this.Teams = [];
    if (this.teamSearch.invalid) {
      return;
    }
    this.teamKey = this.teamSearch.value.key;

    this.store.dispatch(new TeamLoadAction(this.teamKey));
  }

  joinTeamPublic(team: any) {
    this.idTeam = team._id;

    const data = {
      user: this.user.id,
      team: this.idTeam,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadRequestPublicTeam(data));
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
      });
    this.subscriptions.add(subscription);
  }
}
