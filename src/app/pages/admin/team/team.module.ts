
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  IConfig,
  NgxMaskDirective,
  NgxMaskPipe,
  provideNgxMask,
} from 'ngx-mask';

import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { TeamOverviewComponent } from './team-overview/team-overview.component';

import { SharedModule } from '../../../shared/shared.module';
import { TeamRoutes } from './team.routing';
import { TeamSetupComponent } from './team-setup/team-setup.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamSearchComponent } from './team-search/team-search.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [TeamOverviewComponent, TeamSetupComponent, TeamCreateComponent, TeamSearchComponent],
  providers: [LocalStorageUtils, provideNgxMask()],
  imports: [
    CommonModule,
    RouterModule.forChild(TeamRoutes),
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TeamModule {}
