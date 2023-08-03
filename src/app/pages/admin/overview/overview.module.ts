import { NgModule } from "@angular/core";
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { HeaderPlayerComponent } from './Player/header-player/header-player.component';
import { TimelinePlayerComponent } from './Player/timeline-player/timeline-player.component';
import { OverviewRoutes } from "./overview.routing";
import { OverviewPlayerComponent } from "./Player/overview-player/overview-player.component";
import { OverviewTeamComponent } from './Team/overview-team/overview-team.component';
import { HeaderTeamComponent } from './Team/header-team/header-team.component';
import { MembersTeamComponent } from './Team/members-team/members-team.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
    declarations: [OverviewPlayerComponent, HeaderPlayerComponent, TimelinePlayerComponent, OverviewTeamComponent, HeaderTeamComponent, MembersTeamComponent],
    providers: [provideNgxMask()],
    imports: [
        CommonModule,
        RouterModule.forChild(OverviewRoutes),
        NgxMaskDirective,
        NgxMaskPipe,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        YouTubePlayerModule,
    ],
})

export class OverviewModule { }