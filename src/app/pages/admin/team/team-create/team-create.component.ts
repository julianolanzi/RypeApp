import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CreateTeam } from 'src/app/models/teams/create-team';
import { TeamService } from 'src/app/services/teams/team.service';
import { AlertService } from 'src/app/services/utils/alert.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss'],
})
export class TeamCreateComponent {
  errors: any[] = [];
  createTeam!: FormGroup;
  isLoading: boolean = false;
  id: string = '';
  url!: string;

  team!: CreateTeam;
  constructor(
    private TeamService: TeamService,
    private Alerts: AlertService,
    private router: Router
  ) {
    this.isLoading = false;
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
    this.isLoading = true;
    this.team = Object.assign({}, this.team, this.createTeam.value);
    this.url = this.imgTeam();

    this.team = {
      ...this.team,
      admin: this.id,
      url: this.url,
      name: this.team.name.toLowerCase(),
    };
    this.TeamService.createTeam(this.team).subscribe(
      (sucesso) => {
        this.processarSucesso(sucesso);
        this.Alerts.success('Criado com sucesso voce será redirecionado', 'Time');

        setTimeout(() => {
          this.router.navigate(['/team-overview']);
        }, 4000);
      },
      (falha) => {
        this.processarFalha(falha);
        this.Alerts.error(falha.error.error, 'Ops, Aconteceu um erro 🥺');
      }
    );
 
  }
  processarSucesso(response: any) {
    this.isLoading = false;
    this.errors = [];
  }

  processarFalha(fail: any) {
    this.isLoading = false;
    this.errors = fail.error.errors;
  }
  imgTeam() {
    const path = 'https://rype-app.vercel.app';
    var img = '/assets/img/avatars/team/logo-team.jpg';

    let url = path + '/' + img;
    return url;
  }
}
