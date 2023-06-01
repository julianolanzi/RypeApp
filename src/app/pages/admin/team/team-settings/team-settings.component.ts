import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserLoginSuccess } from 'src/app/models/auth/user-login-success';
import { TeamDataSuccess } from 'src/app/models/teams/team-data-sucess';
import { UpdateImgTeam } from 'src/app/models/teams/team-update-img';
import { TeamUpdateInfo } from 'src/app/models/teams/team-update-request';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { TeamLoadUpdateRequestImg } from 'src/app/shared/state-management/actions/teams/team-img/team-load-update-img-request.actions';
import { TeamLoadInfoRequestAction } from 'src/app/shared/state-management/actions/teams/update-team/team-load-info-request.actions';
import { TeamLoadUpdateRequestAction } from 'src/app/shared/state-management/actions/teams/update/team-load-update-info.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import {
  TeamDataSelector,
  TeamLoadingTeam,
} from 'src/app/shared/state-management/selectors/team.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss'],
})
export class TeamSettingsComponent {
  cover = './assets/img/teams/cover-team.jpg'
  updateForm!: FormGroup;
  teamUpdate!: TeamUpdateInfo;
  Team!: TeamDataSuccess;
  idTeam: string = '';
  loading$!: Observable<boolean>;
  isLoadingInfo!: boolean;
  public user!: UserLoginSuccess;
  url: any;
  file!: File;
  isprivate: string = '';
  updateImgTeam!: UpdateImgTeam;

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<GlobalState>, private datePipe: DatePipe) {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));

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
      idTeam: new FormControl({ value: '', disabled: true }),
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
    this.loadUser();
    this.loadInfoTeam();
    this.initForm();
    this.loadTeamInfo();
  }

  initForm() {
    if (!this.isLoadingInfo) {
      this.getTeam();
    }
  }
  getTeam() {
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadInfoRequestAction(this.idTeam));
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

  updateinfoTeam() {
    if (this.updateForm.invalid) {
      return;
    }

    this.teamUpdate = Object.assign({}, this.teamUpdate, this.updateForm.value);

    this.teamUpdate = {
      ...this.teamUpdate,
      id: this.Team._id,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadUpdateRequestAction(this.teamUpdate));
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
  public loadInfoTeam() {
    const subscription = this.store
      .pipe(select(TeamLoadingTeam))
      .subscribe((ative) => {
        this.isLoadingInfo = ative;
      });
    this.subscriptions.add(subscription);
  }

  changeImg() {
    this.updateImgTeam = {
      file: this.file,
      id: this.Team._id,
    };
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadUpdateRequestImg(this.updateImgTeam));
  }

  public loadTeamInfo() {
    const subscription = this.store
      .pipe(select(TeamDataSelector))
      .subscribe((team) => {
        this.Team = team;
        this.url = team.url;
        this.isprivate = this.Team.private.toString();
        this.updateForm.patchValue({
          idTeam: this.Team.idTeam,
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

  ngOnDestroy(): void {
    // this.store.dispatch(new AccountResetLoadAction());
  }
}
