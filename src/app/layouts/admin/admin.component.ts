import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadingNotificationsDisabledAction } from 'src/app/shared/state-management/actions/global-pages/global-notifications/loading-notifications-disabled.actions';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {

  constructor(private store: Store<GlobalState>) {


  }

  ngOnInit(): void {
    let container = document.querySelector('.container-all') as HTMLElement;
   
    
    container.addEventListener('click', () => {
      this.store.dispatch(new LoadingNotificationsDisabledAction());
    
      
    });
  }

}
