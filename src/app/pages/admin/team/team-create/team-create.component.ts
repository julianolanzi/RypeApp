import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { CreateTeam } from 'src/app/models/teams/create-team';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { TeamLoadCreateRequestAction } from 'src/app/shared/state-management/actions/teams/team-load-create-request.actions';

import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss'],
})
export class TeamCreateComponent {
  errors: any[] = [];
  createTeam!: FormGroup;
  id: string = '';
  url!: string;

  loading$!: Observable<boolean>;
  private subscriptions: Subscription = new Subscription();
  team!: CreateTeam;

  constructor(private store: Store<GlobalState>) {
    this.createTeam = new FormGroup({
      name: new FormControl('', [Validators.required]),
      tagName: new FormControl('', [Validators.required]),
      instagramTeam: new FormControl(''),
      discordTeam: new FormControl(''),
      emailTeam: new FormControl(''),
      facebookTeam: new FormControl(''),
      youtubeTeam: new FormControl(''),
      description: new FormControl(''),
      private: new FormControl('', [Validators.required]),
    });

    this.loading$ = this.store.pipe(select(isLoadingGlobal));
  }

  ngOnInit(): void {
  this.loadUser();
  }

  get name() {
    return this.createTeam.get('name')!;
  }
  get tagName() {
    return this.createTeam.get('tagName')!;
  }
  get private() {
    return this.createTeam.get('private')!;
  }

  createTeamData() {
    if (this.createTeam.invalid) {
      return;
    }
    this.team = Object.assign({}, this.team, this.createTeam.value);

    const data = {
      ...this.team,
      url: './assets/img/teams/logo-team.jpg',
    };

    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadCreateRequestAction(data));
  }



  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.id = user.id;
      });
    this.subscriptions.add(subscription);
  }
}
