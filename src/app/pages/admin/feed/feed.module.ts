import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {
    IConfig,
    NgxMaskDirective,
    NgxMaskPipe,
    provideNgxMask,
} from 'ngx-mask';

import { FeedRoutes } from "./feed.routing";

import { CreatePostComponent } from "./create-post/create-post.component";
import { TimelineComponent } from "./timeline/timeline.component";

import { SharedModule } from "src/app/shared/shared.module";
import { ImageCropperModule } from "ngx-image-cropper";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { FeedPageComponent } from './feed-page/feed-page.component';
import { TextPostComponent } from './create-post/text-post/text-post.component';
import { ImagePostComponent } from './create-post/image-post/image-post.component';
import { VideoPostComponent } from './create-post/video-post/video-post.component';



export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    declarations: [TimelineComponent, CreatePostComponent, FeedPageComponent, TextPostComponent, ImagePostComponent, VideoPostComponent],
    providers: [provideNgxMask()],
    imports: [
        CommonModule,
        RouterModule.forChild(FeedRoutes),
        NgxMaskDirective,
        NgxMaskPipe,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ImageCropperModule,
        YouTubePlayerModule,
    ],
})
export class FeedModule { }