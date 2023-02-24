
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { BaseService } from '../base.service';
import { TeamData } from 'src/app/models/teams/team-data';
import { CreateTeam } from 'src/app/models/teams/create-team';
import { TeamsSearch } from 'src/app/models/teams/search-teams';


@Injectable()
export class TeamService extends BaseService {

  constructor(private http: HttpClient, Store: Store) {
    super(Store);
  }

  getUserTeam(id: string): Observable<TeamData> {
    let response = this.http
      .get(
        this.UrlServiceV1 + '/teams/search/user/' + id,
        this.ObterAuthHeaderJson()
      )
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
    return response;
  }

  createTeam(team: CreateTeam): Observable<CreateTeam> {
    let response = this.http
      .post(this.UrlServiceV1 + '/teams', team, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  searchTeams(key: string): Observable<TeamsSearch> {
    let response = this.http
      .get(
        this.UrlServiceV1 + '/teams/search/' + key,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  joinTeam(data: any): Observable<any> {
    let response = this.http
      .post(
        this.UrlServiceV1 + '/teams/teampublic',
        data,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

}
