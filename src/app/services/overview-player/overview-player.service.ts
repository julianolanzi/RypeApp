import { HttpClient } from "@angular/common/http";
import { BaseService } from "../base.service";
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { PlayerSuccessResponse } from "src/app/models/overview-player/player/player-success-respose";
import { Observable, catchError, map } from "rxjs";
import { TimelineSuccess } from "src/app/models/feed/timeline/timeline-success";

@Injectable()
export class OverviewService extends BaseService {
    constructor(private http: HttpClient, Store: Store) {
        super(Store);
    }

    getOverviewPlayer(id: string | undefined): Observable<PlayerSuccessResponse> {
        let response = this.http
            .get(
                this.UrluserTeam + '/users/overview/' + id,
                this.ObterAuthHeaderJson()
            )
            .pipe(map(this.extractData), catchError(this.serviceError));
        return response;
    }

    getTimelinePlayer(id: string | undefined): Observable<TimelineSuccess> {
        let response = this.http
            .get(
                this.UrlFeed + '/player/timeline/' + id,
                this.ObterAuthHeaderJson()
            )
            .pipe(map(this.extractData), catchError(this.serviceError));
        return response;
    }


}
