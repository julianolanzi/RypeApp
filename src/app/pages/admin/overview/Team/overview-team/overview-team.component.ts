import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { OpTeamIdRequestAction } from 'src/app/shared/state-management/actions/overview/team/load-info-team/op-load-team-id-request.action';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { TeamId } from 'src/app/shared/state-management/selectors/overview.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-overview-team',
  templateUrl: './overview-team.component.html',
  styleUrls: ['./overview-team.component.scss']
})
export class OverviewTeamComponent {
  loading$!: Observable<boolean>;
  private subscriptions: Subscription = new Subscription();
  idTeam: string = '';

  constructor(private store: Store<GlobalState>, private router: Router) {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth' // Adiciona um efeito de rolagem suave
    });
  }

  ngOnInit(): void {
    this.loadIdTeam();
    this.loadTeam();
  }
  loadIdTeam(){
    const subscription = this.store
    .pipe(select(TeamId))
    .subscribe((response) => {
      this.idTeam = response;
   
    });

  this.subscriptions.add(subscription);
  }
  loadTeam() {
    this.store.dispatch(new LoadingSmallActiveAction({ flag: true, message: 'Carregando informações do Time' }));
    this.store.dispatch(new OpTeamIdRequestAction(this.idTeam))
  }
}
