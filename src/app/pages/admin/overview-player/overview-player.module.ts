import { NgModule } from "@angular/core";
import { OverviewPlayerComponent } from "./overview-player/overview-player.component";
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { CommonModule } from "@angular/common";
import { OverviewPlayerRoutes } from "./overview-player.routing";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { HeaderPlayerComponent } from './header-player/header-player.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
    declarations: [OverviewPlayerComponent, HeaderPlayerComponent],
    providers: [provideNgxMask()],
    imports: [
        CommonModule,
        RouterModule.forChild(OverviewPlayerRoutes),
        NgxMaskDirective,
        NgxMaskPipe,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        YouTubePlayerModule,
    ],
})

export class OverviewPlayerModule { }