import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';
import { Router } from '@angular/router';
import { isUrlCoverTeam, urlTeam } from 'src/app/shared/state-management/selectors/global-pages.selector';

@Component({
  selector: 'app-header-team',
  templateUrl: './header-team.component.html',
  styleUrls: ['./header-team.component.scss']
})
export class HeaderTeamComponent {
  private subscriptions: Subscription = new Subscription();
  ImageProfile$!: Observable<string>;
  urlCover$!: Observable<string>;


  constructor(private store: Store<GlobalState>, private Router: Router) {

    this.urlCover$ = this.store.pipe(select(isUrlCoverTeam));
    this.ImageProfile$ = this.store.pipe(select(urlTeam));
  }

  ngOnInit(): void {

  }


  uploadImageTeam() {
    this.Router.navigate(['update-image-team']);
  }
  uploadCoverTeam() {
    this.Router.navigate(['update-cover-team']);
  }



}
