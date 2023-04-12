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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamUpdateInfo } from 'src/app/models/teams/team-update-request';
import { DatePipe } from '@angular/common';
import { TeamLoadInfoRequestAction } from 'src/app/shared/state-management/actions/teams/update-team/team-load-info-request.actions';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss'],
})
export class TeamOverviewComponent {
  updateForm!: FormGroup;
  teamUpdate!: TeamUpdateInfo;
  Team!: TeamDataSuccess;
  idTeam: string = '';
  isadmin: boolean = false;
  loading$!: Observable<boolean>;
  public user!: UserLoginSuccess;
  url: any;
  file!: File;
  isprivate: string = '';

  isTeam: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<GlobalState>, private datePipe: DatePipe) {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    this.isTeam = false;


    this.updateForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      tagName: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      instagramTeam: new FormControl(''),
      discordTeam: new FormControl(''),
      emailTeam: new FormControl(''),
      facebookTeam: new FormControl(''),
      youtubeTeam: new FormControl(''),
      private: new FormControl('', [Validators.required]),
      createdAt: new FormControl({ value: '', disabled: true }),
    });
  }
  get name() {
    return this.updateForm.get('name')!;
  }
  get tagName() {
    return this.updateForm.get('tagName')!;
  }
  get private() {
    return this.updateForm.get('private')!;
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
        if(this.idTeam == ''){
        }
      });

    this.subscriptions.add(subscription);
  }

  updateinfoTeam() {
    if (this.updateForm.invalid) {
      return;
    }

    this.teamUpdate = Object.assign({}, this.teamUpdate, this.updateForm.value);
  }

  onselectFile(e: any) {
    if (e.target.files) {
      this.file = e.srcElement.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  public loadTeamInfo() {
    const subscription = this.store
      .pipe(select(TeamDataSelector))
      .subscribe((team) => {
        this.Team = team;
        if(this.Team.idTeam  != ''){
          this.isTeam = true;
        }
        this.url = team.url;
        this.isprivate = this.Team.private.toString();
        this.updateForm.patchValue({
          name: this.Team.name,
          tagName: this.Team.tagName,
          description: this.Team.description,
          private: this.isprivate,
          emailTeam: this.Team.emailTeam,
          instagramTeam: this.Team.instagramTeam,
          discordTeam: this.Team.discordTeam,
          facebookTeam: this.Team.facebookTeam,
          youtubeTeam: this.Team.youtubeTeam,
          createdAt: this.datePipe.transform(
            this.Team.createdAt,
            'dd-MM-yyyy',
            'UTC'
          ),
        });
      });

    this.subscriptions.add(subscription);
  }
}
