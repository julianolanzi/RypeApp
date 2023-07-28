import { Component } from '@angular/core';
import { GlobalState } from '../state-management/states/global.state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { smallLoadingMessage } from '../state-management/selectors/global-pages.selector';

@Component({
  selector: 'app-small-loading',
  templateUrl: './small-loading.component.html',
  styleUrls: ['./small-loading.component.scss']
})
export class SmallLoadingComponent {
  message$: Observable<string> = this.store.pipe(select(smallLoadingMessage));
  constructor(private store: Store<GlobalState>) { }

}
