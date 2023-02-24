import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TeamService } from 'src/app/services/teams/team.service';
import { AlertService } from 'src/app/services/utils/alert.service';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.scss'],
})
export class TeamSearchComponent {
  isLoading: boolean = false;
  errors: any[] = [];
  teamSearch!: FormGroup;

  Teams: any[] | undefined;
  idUser: string = '';
  idTeam: string = '';
  teamKey: string = '';

  constructor(
    private TeamService: TeamService,
    private Alerts: AlertService,
    private router: Router
  ) {
    this.teamSearch = new FormGroup({
      key: new FormControl('', [Validators.required]),
    });
  }

  get key() {
    return this.teamSearch.get('key')!;
  }

  searchTeam() {
    this.Teams = [];
    if (this.teamSearch.invalid) {
      return;
    }
    this.teamKey = this.teamSearch.value.key;

    this.TeamService.searchTeams(this.teamKey).subscribe(
      (sucesso) => {
        this.processarSucesso(sucesso);
      },
      (falha) => {
        this.processarFalha(falha);
        this.Alerts.error(falha.error.error, 'Ops');
      }
    );
  }

  joinTeamPublic(team: any) {
    this.isLoading = true;
    this.idTeam = team._id;

    const data = {
      user: this.idUser,
      team: this.idTeam,
    };

    this.TeamService.joinTeam(data).subscribe(
      (sucesso) => {
        this.processarSucessoJoinTeam(sucesso);
        this.Alerts.sucess('Agora voce faz parte do time', 'Parabéns');
      },
      (falha) => {
        this.processarFalha(falha);
        this.Alerts.error(falha.error.error, 'Ops, Aconteceu um erro 🥺');
      }
    );
  }

  processarSucesso(response: any) {
    this.Teams = response;
    this.isLoading = false;
    this.errors = [];
  }
  processarSucessoJoinTeam(response: any) {
    this.isLoading = false;
    this.errors = [];

    setTimeout(() => {
      this.router.navigate(['/team-overview']);
    }, 4000);
  }
  processarFalha(fail: any) {
    this.isLoading = false;
    this.errors = fail.error.errors;
  }
  
}
