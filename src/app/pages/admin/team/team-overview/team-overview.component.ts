import { Component } from '@angular/core';

import { TeamData } from '../../../../models/teams/team-data';
import { TeamService } from 'src/app/services/teams/team.service';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss'],
})
export class TeamOverviewComponent {
  errors: any[] = [];
  isLoading: boolean = false;
  id: string = '';
  Team!: TeamData;
  idTeam: string = '';
  isadmin: boolean = false;

  constructor(private teamService: TeamService) {
    this.isLoading = true;
    this.UserTeamInfo();
  }

  UserTeamInfo() {

    this.teamService.getUserTeam(this.id).subscribe(
      (sucesso) => {
        this.processarSucesso(sucesso);
        this.isLoading = false;

        this.Team = sucesso;
    
        console.log(this.Team);
        if (this.Team.data.role == 'admin') {
          this.isadmin = true;
          console.log(this.isadmin);
        }
      },
      (falha) => {
        this.processarFalha(falha);
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
}
