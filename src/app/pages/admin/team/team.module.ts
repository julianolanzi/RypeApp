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

import { TeamOverviewComponent } from './team-overview/team-overview.component';

import { SharedModule } from '../../../shared/shared.module';
import { TeamRoutes } from './team.routing';
import { TeamSetupComponent } from './team-setup/team-setup.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamSearchComponent } from './team-search/team-search.component';
import { TeamSettingsComponent } from './team-settings/team-settings.component';
import { TeamUpdateMemberComponent } from './team-update-member/team-update-member.component';
import { TeamUpdateAdminComponent } from './team-update-admin/team-update-admin.component';
import { TeamUserSearchComponent } from './team-user-search/team-user-search.component';
import { HeaderTeamComponent } from './header-team/header-team.component';
import { UpdateImgTeamComponent } from './update-img-team/update-img-team.component';
import { UpdateCoverTeamComponent } from './update-cover-team/update-cover-team.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    TeamOverviewComponent,
    TeamSetupComponent,
    TeamCreateComponent,
    TeamSearchComponent,
    TeamSettingsComponent,
    TeamUpdateMemberComponent,
    TeamUpdateAdminComponent,
    TeamUserSearchComponent,
    HeaderTeamComponent,
    UpdateImgTeamComponent,
    UpdateCoverTeamComponent,
  ],
  providers: [provideNgxMask()],
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
