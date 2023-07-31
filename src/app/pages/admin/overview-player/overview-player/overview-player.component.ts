import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoadingSmallActiveAction } from 'src/app/shared/state-management/actions/global-pages/global-loading-small/loading-small-active.actions';
import { OpPlayerIdRequestAction } from 'src/app/shared/state-management/actions/overview/search-player/op-load-player-id-request.action';
import { PlayerId } from 'src/app/shared/state-management/selectors/overview.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-overview-player',
  templateUrl: './overview-player.component.html',
  styleUrls: ['./overview-player.component.scss']
})
export class OverviewPlayerComponent {
  idPlayer: string = '';
  private subscriptions: Subscription = new Subscription();
  loading$!: Observable<boolean>;

  constructor(private store: Store<GlobalState>) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth' // Adiciona um efeito de rolagem suave
    });


  }

  ngOnInit(): void {
    this.loadId();
    this.loadPlayer();
  }

  public loadId() {
    const subscription = this.store
      .pipe(select(PlayerId))
      .subscribe((player) => {
        this.idPlayer = player;
        console.log(this.idPlayer);
      });

    this.subscriptions.add(subscription);
  }

  loadPlayer() {
    console.log(this.idPlayer);
    this.store.dispatch(new LoadingSmallActiveAction({ flag: true, message: 'Carregando informações do Jogador' }));
    this.store.dispatch(new OpPlayerIdRequestAction(this.idPlayer))
  }


}
