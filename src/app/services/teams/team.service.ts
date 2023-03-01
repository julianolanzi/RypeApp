import { TeamDataSuccess } from './../../models/teams/team-data-sucess';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { BaseService } from '../base.service';
import { CreateTeamSuccess } from 'src/app/models/teams/create-team-success';
import { CreateTeam } from 'src/app/models/teams/create-team';
import { TeamsSearch } from 'src/app/models/teams/search-teams';
import { TeamData } from 'src/app/models/teams/team-data';

@Injectable()
export class TeamService extends BaseService {
  constructor(private http: HttpClient, Store: Store) {
    super(Store);
  }
  createTeam(data: CreateTeam | undefined): Observable<CreateTeamSuccess> {
    let response = this.http
      .post(this.UrlServiceV1 + '/teams/', data, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  getUserTeam(id: string): Observable<TeamData> {
    let response = this.http
      .get(
        this.UrlServiceV1 + '/teams/search/user/' + id,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  searchTeams(key: string | undefined): Observable<TeamsSearch> {
    let response = this.http
      .get(
        this.UrlServiceV1 + '/teams/search/' + key,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  joinTeam(data: any | undefined): Observable<any> {
    let response = this.http
      .post(
        this.UrlServiceV1 + '/teams/teampublic',
        data,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  getById(id: string | undefined): Observable<TeamDataSuccess> {
    let response = this.http
      .get(this.UrlServiceV1 + '/teams/' + id, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }
}
