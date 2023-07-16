import { TeamDataSuccess } from '../../models/teams/load-team/team-data-sucess';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { BaseService } from '../base.service';
import { CreateTeamSuccess } from 'src/app/models/teams/create-team/create-team-success';
import { RemoveMembers } from 'src/app/models/teams/manage-team/team-remove-member';
import { PromoteAdmin } from 'src/app/models/teams/manage-team/team-promote-admin';
import { RemoveAdmin } from 'src/app/models/teams/manage-team/team-remove-admin';
import { CreateTeamRequest } from 'src/app/models/teams/create-team/create-team-request';
import { TeamUpdateInfoRequest } from 'src/app/models/teams/team-update/team-update-request';
import { SearchTeamSuccess } from 'src/app/models/teams/search-team/search-team-sucess';

@Injectable()
export class TeamService extends BaseService {
  constructor(private http: HttpClient, Store: Store) {
    super(Store);
  }
  createTeam(data: CreateTeamRequest | undefined): Observable<CreateTeamSuccess> {
    let response = this.http
      .post(this.UrluserTeam + '/teams/', data, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  getUserTeam(id: string): Observable<TeamDataSuccess> {
    let response = this.http
      .get(
        this.UrluserTeam + '/teams/search/user/' + id,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  searchTeams(key: string | undefined): Observable<SearchTeamSuccess> {
    let response = this.http
      .get(
        this.UrlNotifications + '/notifications/team/searchTeam/' + key,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  joinTeam(data: any | undefined): Observable<any> {
    let response = this.http
      .post(
        this.UrluserTeam + '/teams/teampublic',
        data,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  getById(id: string | undefined): Observable<TeamDataSuccess> {
    let response = this.http
      .get(this.UrluserTeam + '/teams/' + id, this.ObterAuthHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  updateInfoTeam(
    upTeam: TeamUpdateInfoRequest | undefined
  ): Observable<TeamDataSuccess> {
    let response = this.http
      .put(
        this.UrluserTeam + '/teams/' + upTeam?.id,
        upTeam,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  quitTeam(id: string | undefined): Observable<any> {
    let response = this.http
      .delete(
        this.UrluserTeam + '/teams/quit/team/' + id,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  updateAdminMember(team: string, user: any): Observable<any> {
    let response = this.http
      .put(
        this.UrluserTeam + '/teams/admin/' + team,
        user,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  quitMember(data: RemoveMembers | undefined): Observable<any> {
    let idteam = data?.idTeam;
    let user = {member: data?.idUser}

    let response = this.http
      .put(
        this.UrluserTeam + '/teams/quit/member/' + idteam,
        user,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }
  updateMemberTeam(data: PromoteAdmin | undefined): Observable<any> {
    let idteam = data?.idTeam;
    let user = {member: data?.idUser}

    let response = this.http
      .put(
        this.UrluserTeam + '/teams/admin/' + idteam,
        user,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  removeAdminTeam(team: RemoveAdmin | undefined): Observable<any> {
    let idteam = team?.idTeam;
    let user = {member: team?.idUser}

    let response = this.http
      .put(
        this.UrluserTeam + '/teams/update/member/' + idteam,
        user,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }
}
