import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PostCreateRequest } from 'src/app/models/feed/create-post/post-create-request';
import { AlertService } from 'src/app/services/utils/alert.service';
import { FeedPostCreateRequestAction } from 'src/app/shared/state-management/actions/feed/feed-post/feed-create-post-request.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-video-post',
  templateUrl: './video-post.component.html',
  styleUrls: ['./video-post.component.scss']
})
export class VideoPostComponent {
  @Output() resetPost = new EventEmitter();
  postFormYoutube!: FormGroup;
  postRequestYoutube!: PostCreateRequest;
  public user!: any;
  counterText: number = 0;
  private subscriptions: Subscription = new Subscription();
  videoId = '';
  apiLoaded = false;

  enablePreviewVideo: boolean = false;

  constructor(private store: Store<GlobalState>, private Alerts: AlertService) {
    this.postFormYoutube = new FormGroup({
      text: new FormControl('',[Validators.required]),
      urlVideo: new FormControl('', [Validators.required, Validators.minLength(10)]),
    })

    this.postFormYoutube.get('text')?.valueChanges.pipe().subscribe((newvalue) => {
      this.counterText = newvalue.length;
    })
  }

  get urlVideo() {
    return this.postFormYoutube.get('urlVideo');
  }

  createPostYoutube() {
    if (this.postFormYoutube.invalid) {
      return;
    }

    this.postRequestYoutube = Object.assign({}, this.postRequestYoutube, this.postFormYoutube.value);

    this.postRequestYoutube = {
      ...this.postFormYoutube.value,
      type: 'video',
      urlVideo: this.videoId
    }

    this.store.dispatch(new FeedPostCreateRequestAction(this.postRequestYoutube));

    this.postFormYoutube.reset();
    this.enablePreviewVideo = false;
    this.resetPost.emit();
  }
  ngOnInit(): void {
    this.loadUser()


    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
      });
    this.subscriptions.add(subscription);
  }

  onSelectVideo(e: any) {
    let Urlinfo = e.target.value;
    let start = Urlinfo.indexOf('v=');
    let start2 = Urlinfo.indexOf('.be');


    if (start != -1) {
      let last = Urlinfo.indexOf('&');
      start = start + 2;
      let result = Urlinfo.substring(start, last);
      this.videoId = result;
      this.enablePreviewVideo = true;
    }
    if (start2 != -1) {
      let UrlMobile = Urlinfo.split('/');
      this.videoId = UrlMobile[3];
      this.enablePreviewVideo = true;
    } if (start == -1 && start2 == -1) {
      this.Alerts.error('Url inválida');
    }

  }
}
