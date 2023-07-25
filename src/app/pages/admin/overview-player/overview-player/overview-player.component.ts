import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { OpPlayerIdRequestAction } from 'src/app/shared/state-management/actions/overview-player/search-player/op-load-player-id-request.action';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { PlayerId } from 'src/app/shared/state-management/selectors/overviewplayer.selector';
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
  
  constructor(private store: Store<GlobalState>){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth' // Adiciona um efeito de rolagem suave
    });
   

  }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    this.loadId();
    this.loadPlayer();
  }

  public loadId() {
    const subscription = this.store
      .pipe(select(PlayerId))
      .subscribe((player) => {
        this.idPlayer = player;
       
      });

    this.subscriptions.add(subscription);
  }

  loadPlayer(){
    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new OpPlayerIdRequestAction(this.idPlayer))
  }

}
